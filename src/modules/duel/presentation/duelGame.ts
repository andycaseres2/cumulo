import { drawCards } from '../domain/deck';
import { MAX_HP, MAX_ROUNDS, matchResult, planRivalAnswer, playRound, startMatch, type MatchState, type PlayerAnswer, type RivalPlan, type RoundResult } from '../domain/DuelMatch';
import { recordDuelWin, recordPractice, recordTimeAttack, type DuelProgress } from '../domain/DuelProgress';
import { isRivalUnlocked, type Rival } from '../domain/Rival';
import { answerOption, type DuelCard, type ServiceFamily } from '../domain/ServiceFamily';
import { TIME_ATTACK_MS, WRONG_PENALTY_MS, answerTimeAttack, startTimeAttack, timeLeft, type TimeAttackState } from '../domain/TimeAttack';
import './duelGame.css';

export interface DuelGameOptions {
  families: ServiceFamily[];
  rivals: Rival[];
  progress: DuelProgress;
  playerName: string;
  /** Called with the new progress whenever the player achieves something worth keeping. */
  onProgress: (progress: DuelProgress) => void;
  theoryUrl: (topicSlug: string) => string;
  random?: () => number;
  now?: () => number;
}

/** Scenarios in a training session. */
export const TRAINING_CARDS = 10;
const TICK_MS = 100;
const LETTERS = ['1', '2', '3', '4'];

type Child = Node | string;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: Child[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function button(label: Child | Child[], onClick: () => void, attrs: Record<string, string> = {}) {
  const node = el('button', { type: 'button', ...attrs }, Array.isArray(label) ? label : [label]);
  node.addEventListener('click', onClick);
  return node;
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter((word) => /^[A-ZÁÉÍÓÚ]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

const percent = (share: number) => `${Math.round(share * 100)} %`;
const seconds = (ms: number) => `${Math.ceil(ms / 1000)} s`;

/** A short shake or pop on an element, restarted when it plays again. */
function play(node: Element, effect: 'sd-shake' | 'sd-pop' | 'sd-flash-good' | 'sd-flash-bad') {
  node.classList.remove(effect);
  void (node as HTMLElement).offsetWidth;
  node.classList.add(effect);
}

/** The Service Duel: menu, duels against the rival ladder, time attack and training by service family. */
export function renderDuelGame(host: HTMLElement, options: DuelGameOptions): () => void {
  const random = options.random ?? Math.random;
  const now = options.now ?? (() => Date.now());
  let progress = options.progress;
  const root = el('section', { class: 'service-duel' });
  host.replaceChildren(root);

  let timer: ReturnType<typeof setInterval> | undefined;
  let keyHandler: ((event: KeyboardEvent) => void) | null = null;
  const stopTimer = () => {
    if (timer) clearInterval(timer);
    timer = undefined;
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.metaKey || event.ctrlKey || event.altKey) return;
    keyHandler?.(event);
  };
  document.addEventListener('keydown', onKey);

  // The first screen stays where the page loads; later screens scroll up to the start of the game.
  let firstScreen = true;
  const show = (...children: Child[]) => {
    stopTimer();
    keyHandler = null;
    root.replaceChildren(...children);
    if (!firstScreen) root.scrollIntoView?.({ block: 'start', behavior: 'smooth' });
    firstScreen = false;
  };

  /** Keys 1–4 pick an option; Enter or Space press the screen's main button. */
  const listenKeys = (choose: ((index: number) => void) | null, primary: () => HTMLButtonElement | null) => {
    keyHandler = (event) => {
      const index = LETTERS.indexOf(event.key);
      if (choose && index >= 0) {
        event.preventDefault();
        choose(index);
      } else if (event.key === 'Enter' || event.key === ' ') {
        const target = primary();
        if (target && !target.disabled) {
          event.preventDefault();
          target.click();
        }
      }
    };
  };

  const save = (next: DuelProgress) => {
    progress = next;
    options.onProgress(next);
  };

  const familiesOf = (rival: Rival) => (rival.families.length === 0 ? options.families : options.families.filter((f) => rival.families.includes(f.id)));

  const avatar = (name: string, tone: string) => el('span', { class: 'sd-avatar', style: `--tone: ${tone}`, 'aria-hidden': 'true' }, [initials(name)]);
  const rivalTone = (rival: Rival) => `var(--sd-tone-${options.rivals.indexOf(rival) % 5})`;

  function optionButtons(card: DuelCard, onPick: (service: string) => void): HTMLButtonElement[] {
    return card.options.map((option, i) =>
      button([el('span', { class: 'sd-key' }, [LETTERS[i]]), el('span', {}, [option.service])], () => onPick(option.service), {
        class: 'sd-option',
        'data-service': option.service,
      }),
    );
  }

  /** Marks the answer, the player's pick and (in a duel) the rival's pick on the option buttons. */
  function markOptions(buttons: HTMLButtonElement[], card: DuelCard, picked: string | null, rivalPick?: string) {
    for (const node of buttons) {
      const service = node.dataset.service!;
      node.disabled = true;
      if (service === card.answer) node.classList.add('is-answer');
      else if (service === picked) node.classList.add('is-wrong');
      if (service === picked) node.append(el('span', { class: 'sd-tag' }, ['Tú']));
      if (rivalPick !== undefined && service === rivalPick) node.append(el('span', { class: 'sd-tag is-rival' }, ['Rival']));
    }
  }

  /** Why the answer is right and, when the player picked another option, why that one is not. */
  function explanation(card: DuelCard, picked: string | null, allOptions = false): HTMLElement {
    const right = answerOption(card);
    const items = allOptions
      ? card.options.map((option) => el('li', { class: option.service === card.answer ? 'is-answer' : '' }, [el('strong', {}, [option.service]), ` ${option.why}`]))
      : [
          el('li', { class: 'is-answer' }, [el('strong', {}, [right.service]), ` ${right.why}`]),
          ...card.options
            .filter((option) => option.service === picked && option.service !== card.answer)
            .map((option) => el('li', { class: 'is-wrong' }, [el('strong', {}, [option.service]), ` ${option.why}`])),
        ];
    return el('div', { class: 'sd-explanation' }, [
      el('ul', {}, items),
      el('a', { href: options.theoryUrl(card.topicSlug), target: '_blank', rel: 'noopener' }, ['Repasar el tema →']),
    ]);
  }

  function reviewList(entries: { card: DuelCard; picked: string | null }[]): HTMLElement {
    return el(
      'ol',
      { class: 'sd-review' },
      entries.map(({ card, picked }) =>
        el('li', { class: picked === card.answer ? 'is-right' : 'is-missed' }, [
          el('p', { class: 'sd-review-prompt' }, [card.prompt]),
          el('p', { class: 'sd-review-answer' }, [
            picked === card.answer ? '✓ ' : '✗ ',
            picked === null ? 'Sin respuesta' : `Tu respuesta: ${picked}`,
            picked === card.answer ? '' : ` · Correcta: ${card.answer}`,
          ]),
          explanation(card, picked),
        ]),
      ),
    );
  }

  // ---------- Menu ----------

  function showMenu() {
    const ladder = options.rivals.map((rival, i) => {
      const beaten = progress.beatenRivals.includes(rival.id);
      const open = isRivalUnlocked(options.rivals, rival.id, progress.beatenRivals);
      const status = beaten ? 'Vencido' : open ? 'Disponible' : 'Bloqueado';
      return el('li', { class: `sd-rival ${beaten ? 'is-beaten' : open ? 'is-open' : 'is-locked'}`, 'data-rival': rival.id }, [
        avatar(rival.name, rivalTone(rival)),
        el('div', { class: 'sd-rival-info' }, [
          el('p', { class: 'sd-rival-name' }, [`${i + 1}. ${rival.name}`]),
          el('p', { class: 'sd-rival-title' }, [`${rival.title} · ${rival.roundSeconds} s por round`]),
          el('p', { class: 'sd-rival-status' }, [beaten ? '✓ ' : open ? '' : '🔒 ', status]),
        ]),
        open
          ? button(beaten ? 'Revancha' : 'Retar', () => showRivalIntro(rival), { class: beaten ? 'sd-secondary' : 'sd-primary' })
          : el('span', { class: 'sd-locked-note' }, ['Vence al rival anterior']),
      ]);
    });

    const families = options.families.map((family) => {
      const best = progress.bestPractice[family.id];
      return el('li', {}, [
        button(
          [el('span', { class: 'sd-family-title' }, [family.title]), el('span', { class: 'sd-family-meta' }, [`${family.cards.length} escenarios${best !== undefined ? ` · mejor ${percent(best)}` : ''}`])],
          () => showTrainingIntro(family),
          { class: 'sd-family', 'data-family': family.id },
        ),
      ]);
    });

    show(
      el('div', { class: 'sd-menu' }, [
        el('section', { class: 'sd-card sd-mode' }, [
          el('h2', { class: 'sd-title' }, ['Duelo']),
          el('p', {}, [
            'Gana el round quien responde bien primero: le quita vida a su rival. Responder rápido y encadenar aciertos pega más fuerte. Vence a cada rival para desbloquear el siguiente.',
          ]),
          el('ol', { class: 'sd-ladder' }, ladder),
        ]),
        el('section', { class: 'sd-card sd-mode' }, [
          el('h2', { class: 'sd-title' }, ['Contrarreloj']),
          el('p', {}, [`${TIME_ATTACK_MS / 1000} segundos para acertar todo lo que puedas, de todas las familias. Cada error te quita ${WRONG_PENALTY_MS / 1000} segundos.`]),
          el('p', { class: 'sd-best', 'data-best-time-attack': '' }, [progress.bestTimeAttack > 0 ? `Tu récord: ${progress.bestTimeAttack} aciertos` : 'Aún no tienes récord']),
          button('Jugar contrarreloj', startTimeAttackMode, { class: 'sd-primary', 'data-start-time-attack': '' }),
        ]),
        el('section', { class: 'sd-card sd-mode' }, [
          el('h2', { class: 'sd-title' }, ['Entrenamiento']),
          el('p', {}, [`Elige una familia de servicios, repasa su chuleta y practica ${TRAINING_CARDS} escenarios sin reloj, con la explicación de cada opción.`]),
          el('ul', { class: 'sd-families' }, families),
        ]),
      ]),
    );
  }

  // ---------- Duel ----------

  function hpBar(label: string, hp: number, side: 'player' | 'rival') {
    return el('div', { class: `sd-hp is-${side}`, 'data-hp': side }, [
      el('div', { class: 'sd-hp-label' }, [el('span', {}, [label]), el('span', { class: 'sd-hp-value' }, [`${hp}`])]),
      el('div', { class: 'sd-hp-track' }, [el('div', { class: 'sd-hp-fill', style: `width: ${(hp / MAX_HP) * 100}%` })]),
    ]);
  }

  function setHp(bar: HTMLElement, hp: number) {
    bar.querySelector<HTMLElement>('.sd-hp-fill')!.style.width = `${(hp / MAX_HP) * 100}%`;
    bar.querySelector('.sd-hp-value')!.textContent = `${hp}`;
    bar.classList.toggle('is-low', hp <= 30);
  }

  function showRivalIntro(rival: Rival) {
    const start = button('¡A duelo!', () => startDuel(rival), { class: 'sd-primary', 'data-start-duel': '' });
    show(
      el('div', { class: 'sd-card sd-intro' }, [
        el('div', { class: 'sd-versus' }, [
          el('div', { class: 'sd-fighter' }, [avatar(options.playerName, 'var(--color-accent)'), el('p', {}, [options.playerName])]),
          el('span', { class: 'sd-vs' }, ['VS']),
          el('div', { class: 'sd-fighter' }, [avatar(rival.name, rivalTone(rival)), el('p', {}, [rival.name])]),
        ]),
        el('p', { class: 'sd-rival-title' }, [rival.title]),
        el('blockquote', { class: 'sd-quote' }, [`“${rival.quote}”`]),
        el('ul', { class: 'sd-rules' }, [
          el('li', {}, [`${rival.roundSeconds} segundos por round, hasta ${MAX_ROUNDS} rounds.`]),
          el('li', {}, ['Gana el round la primera respuesta correcta. Si te equivocas, pierdes la oportunidad.']),
          el('li', {}, ['Cuanto más rápido aciertas, más daño haces; las rachas suman combo.']),
          el('li', {}, ['Responde con las teclas 1–4 o tocando la opción.']),
        ]),
        el('div', { class: 'sd-actions' }, [button('Volver', showMenu, { class: 'sd-secondary' }), start]),
      ]),
    );
    listenKeys(null, () => start);
  }

  function startDuel(rival: Rival) {
    const deck = drawCards(familiesOf(rival), MAX_ROUNDS, random);
    const limit = rival.roundSeconds * 1000;
    let state: MatchState = startMatch();
    const results: RoundResult[] = [];

    const playerBar = hpBar(options.playerName, state.playerHp, 'player');
    const rivalBar = hpBar(rival.name, state.rivalHp, 'rival');
    const roundLabel = el('p', { class: 'sd-round' });
    const streakLabel = el('p', { class: 'sd-streak' });
    const timeFill = el('div', { class: 'sd-time-fill' });
    const rivalStatus = el('p', { class: 'sd-rival-thinking', 'aria-live': 'polite' });
    const stage = el('div', { class: 'sd-stage' });
    const board = el('div', { class: 'sd-card sd-board' }, [
      el('div', { class: 'sd-hud' }, [playerBar, el('div', { class: 'sd-hud-center' }, [roundLabel, streakLabel]), rivalBar]),
      el('div', { class: 'sd-time' }, [timeFill]),
      rivalStatus,
      stage,
    ]);

    function nextRound() {
      const card = deck[state.round];
      const plan: RivalPlan = planRivalAnswer(rival, card, random);
      const startedAt = now();
      let finished = false;
      roundLabel.textContent = `Round ${state.round + 1} de ${MAX_ROUNDS}`;
      streakLabel.textContent = state.streak >= 2 ? `Racha x${state.streak}` : '';
      rivalStatus.textContent = `${rival.name} está pensando…`;
      rivalStatus.className = 'sd-rival-thinking';
      timeFill.style.width = '100%';
      timeFill.classList.remove('is-hurry');

      const buttons = optionButtons(card, (service) => finish({ choice: service, atMs: now() - startedAt }));
      stage.replaceChildren(el('p', { class: 'sd-prompt' }, [card.prompt]), el('div', { class: 'sd-options' }, buttons));
      listenKeys((i) => buttons[i]?.click(), () => null);

      function finish(player: PlayerAnswer | null) {
        if (finished) return;
        finished = true;
        if (timer) clearInterval(timer);
        timer = undefined;
        const round = playRound(state, card, plan, player, limit);
        state = round.state;
        results.push(round.result);
        // The rival's pick is shown when it answered before the round ended, or when it decides a round the player missed.
        const endedAt = player ? player.atMs : plan.correct ? plan.atMs : limit;
        const rivalShown = plan.atMs <= limit && (plan.atMs <= endedAt || !round.result.playerCorrect);
        showRoundFeedback(round.result, buttons, rivalShown);
      }

      timer = setInterval(() => {
        const elapsed = now() - startedAt;
        timeFill.style.width = `${Math.max(0, 100 - (elapsed / limit) * 100)}%`;
        timeFill.classList.toggle('is-hurry', limit - elapsed <= 3000);
        if (elapsed >= plan.atMs && plan.atMs <= limit) {
          if (plan.correct) return finish(null);
          if (!rivalStatus.classList.contains('is-missed')) {
            rivalStatus.textContent = `${rival.name} falló. ¡Es tu oportunidad!`;
            rivalStatus.className = 'sd-rival-thinking is-missed';
          }
        }
        if (elapsed >= limit) finish(null);
      }, TICK_MS);
    }

    function showRoundFeedback(result: RoundResult, buttons: HTMLButtonElement[], rivalShown: boolean) {
      markOptions(buttons, result.card, result.playerChoice, rivalShown ? result.rival.choice : undefined);
      setHp(playerBar, state.playerHp);
      setHp(rivalBar, state.rivalHp);
      const headline =
        result.winner === 'player'
          ? `¡Golpe! −${result.damage} a ${rival.name}`
          : result.winner === 'rival'
            ? `${rival.name} respondió primero: −${result.damage} para ti`
            : 'Nadie acertó a tiempo';
      rivalStatus.textContent = headline;
      rivalStatus.className = `sd-rival-thinking is-${result.winner}`;
      if (result.winner === 'player') play(rivalBar, 'sd-shake');
      if (result.winner === 'rival') play(playerBar, 'sd-shake');
      if (result.winner !== 'none') {
        const target = result.winner === 'player' ? rivalBar : playerBar;
        const popup = el('span', { class: 'sd-damage' }, [`−${result.damage}`]);
        target.append(popup);
        setTimeout(() => popup.remove(), 900);
      }

      const outcome = matchResult(state);
      const next = button(outcome === 'playing' ? 'Siguiente round' : 'Ver resultado', () => (outcome === 'playing' ? nextRound() : showDuelResult(rival, outcome, results)), {
        class: 'sd-primary',
        'data-next': '',
      });
      stage.append(explanation(result.card, result.playerChoice), el('div', { class: 'sd-actions' }, [next]));
      listenKeys(null, () => next);
      next.focus({ preventScroll: true });
    }

    show(board);
    nextRound();
  }

  function showDuelResult(rival: Rival, outcome: 'won' | 'lost' | 'draw', results: RoundResult[]) {
    if (outcome === 'won') save(recordDuelWin(progress, rival.id));
    const won = results.filter((r) => r.winner === 'player').length;
    const right = results.filter((r) => r.playerCorrect).length;
    const index = options.rivals.indexOf(rival);
    const nextRival = options.rivals[index + 1];
    const actions = [
      button('Menú', showMenu, { class: 'sd-secondary' }),
      button('Revancha', () => showRivalIntro(rival), { class: 'sd-secondary' }),
      ...(outcome === 'won' && nextRival ? [button(`Retar a ${nextRival.name}`, () => showRivalIntro(nextRival), { class: 'sd-primary', 'data-next-rival': '' })] : []),
    ];
    const champion = outcome === 'won' && !nextRival;
    show(
      el('div', { class: 'sd-card sd-result', 'data-outcome': outcome }, [
        el('h2', { class: `sd-title sd-outcome is-${outcome}` }, [
          outcome === 'won' ? (champion ? '¡Eres la nueva leyenda de Cúmulo!' : `¡Venciste a ${rival.name}!`) : outcome === 'lost' ? `${rival.name} ganó esta vez` : 'Empate',
        ]),
        el('p', {}, [
          outcome === 'won'
            ? nextRival
              ? `Desbloqueaste a ${nextRival.name}.`
              : 'Venciste a todos los rivales. Sigue practicando en contrarreloj para mantener el ritmo.'
            : 'Repasa las explicaciones de abajo y pide la revancha.',
        ]),
        el('ul', { class: 'sd-stats' }, [
          el('li', {}, [el('strong', {}, [`${won}`]), ' rounds ganados']),
          el('li', {}, [el('strong', {}, [`${right} de ${results.length}`]), ' respuestas correctas']),
        ]),
        el('div', { class: 'sd-actions' }, actions),
        el('h3', { class: 'sd-subtitle' }, ['Repaso de cada round']),
        reviewList(results.map((r) => ({ card: r.card, picked: r.playerChoice }))),
      ]),
    );
    const primary = root.querySelector<HTMLButtonElement>('.sd-result .sd-primary') ?? root.querySelector<HTMLButtonElement>('.sd-result .sd-secondary');
    listenKeys(null, () => primary);
  }

  // ---------- Time attack ----------

  function startTimeAttackMode() {
    let state: TimeAttackState = startTimeAttack(now());
    let deck: DuelCard[] = [];
    const answered: { card: DuelCard; picked: string | null }[] = [];
    const clock = el('p', { class: 'sd-clock' });
    const score = el('p', { class: 'sd-score' }, ['0 aciertos']);
    const stage = el('div', { class: 'sd-stage' });
    const board = el('div', { class: 'sd-card sd-board sd-time-attack' }, [el('div', { class: 'sd-hud' }, [clock, score]), stage]);

    function nextCard() {
      if (deck.length === 0) deck = drawCards(options.families, Infinity, random);
      const card = deck.pop()!;
      const buttons = optionButtons(card, (service) => {
        const correct = service === card.answer;
        state = answerTimeAttack(state, correct, now());
        answered.push({ card, picked: service });
        score.textContent = `${state.score} ${state.score === 1 ? 'acierto' : 'aciertos'}`;
        play(board, correct ? 'sd-flash-good' : 'sd-flash-bad');
        if (!correct) {
          const popup = el('span', { class: 'sd-damage' }, [`−${WRONG_PENALTY_MS / 1000} s`]);
          clock.append(popup);
          setTimeout(() => popup.remove(), 900);
        }
        if (timeLeft(state, now()) > 0) nextCard();
        else finishTimeAttack();
      });
      stage.replaceChildren(el('p', { class: 'sd-prompt' }, [card.prompt]), el('div', { class: 'sd-options' }, buttons));
      listenKeys((i) => buttons[i]?.click(), () => null);
    }

    function finishTimeAttack() {
      const record = state.score > progress.bestTimeAttack;
      if (record) save(recordTimeAttack(progress, state.score));
      const mistakes = answered.filter((a) => a.picked !== a.card.answer);
      const again = button('Jugar otra vez', startTimeAttackMode, { class: 'sd-primary', 'data-again': '' });
      show(
        el('div', { class: 'sd-card sd-result', 'data-outcome': 'time-attack' }, [
          el('h2', { class: 'sd-title' }, [`${state.score} ${state.score === 1 ? 'acierto' : 'aciertos'}`]),
          el('p', {}, [record ? '¡Nuevo récord!' : `Tu récord sigue en ${progress.bestTimeAttack} aciertos.`, ` Respondiste ${state.answered} escenarios.`]),
          el('div', { class: 'sd-actions' }, [button('Menú', showMenu, { class: 'sd-secondary' }), again]),
          ...(mistakes.length > 0 ? [el('h3', { class: 'sd-subtitle' }, ['Tus errores, explicados']), reviewList(mistakes)] : [el('p', {}, ['Sin errores. Impecable.'])]),
        ]),
      );
      listenKeys(null, () => again);
    }

    show(board);
    clock.textContent = seconds(TIME_ATTACK_MS);
    nextCard();
    timer = setInterval(() => {
      const left = timeLeft(state, now());
      clock.firstChild!.textContent = seconds(left);
      clock.classList.toggle('is-hurry', left <= 10_000);
      if (left <= 0) finishTimeAttack();
    }, TICK_MS);
  }

  // ---------- Training ----------

  function showTrainingIntro(family: ServiceFamily) {
    const start = button(`Practicar ${TRAINING_CARDS} escenarios`, () => startTraining(family), { class: 'sd-primary', 'data-start-training': '' });
    show(
      el('div', { class: 'sd-card sd-intro' }, [
        el('h2', { class: 'sd-title' }, [family.title]),
        el('p', {}, [family.summary]),
        el(
          'dl',
          { class: 'sd-cheatsheet' },
          family.services.flatMap((service) => [el('dt', {}, [service.name]), el('dd', {}, [service.summary])]),
        ),
        el('div', { class: 'sd-actions' }, [button('Volver', showMenu, { class: 'sd-secondary' }), start]),
      ]),
    );
    listenKeys(null, () => start);
  }

  function startTraining(family: ServiceFamily) {
    const deck = drawCards([family], TRAINING_CARDS, random);
    const answered: { card: DuelCard; picked: string | null }[] = [];
    const progressLabel = el('p', { class: 'sd-round' });
    const stage = el('div', { class: 'sd-stage' });
    show(el('div', { class: 'sd-card sd-board' }, [el('div', { class: 'sd-hud' }, [el('p', { class: 'sd-family-title' }, [family.title]), progressLabel]), stage]));

    function nextCard() {
      const card = deck[answered.length];
      progressLabel.textContent = `${answered.length + 1} de ${deck.length}`;
      const buttons = optionButtons(card, (service) => {
        if (buttons[0].disabled) return;
        answered.push({ card, picked: service });
        markOptions(buttons, card, service);
        const last = answered.length === deck.length;
        const next = button(last ? 'Ver resultado' : 'Siguiente', () => (last ? finishTraining() : nextCard()), { class: 'sd-primary', 'data-next': '' });
        stage.append(
          el('p', { class: `sd-verdict ${service === card.answer ? 'is-right' : 'is-wrong'}`, 'aria-live': 'polite' }, [service === card.answer ? '¡Correcto!' : 'No es esta.']),
          explanation(card, service, true),
          el('div', { class: 'sd-actions' }, [next]),
        );
        listenKeys(null, () => next);
        next.focus({ preventScroll: true });
      });
      stage.replaceChildren(el('p', { class: 'sd-prompt' }, [card.prompt]), el('div', { class: 'sd-options' }, buttons));
      listenKeys((i) => buttons[i]?.click(), () => null);
    }

    function finishTraining() {
      const right = answered.filter((a) => a.picked === a.card.answer).length;
      const share = right / answered.length;
      save(recordPractice(progress, family.id, share));
      const again = button('Practicar otra vez', () => startTraining(family), { class: 'sd-primary', 'data-again': '' });
      show(
        el('div', { class: 'sd-card sd-result', 'data-outcome': 'training' }, [
          el('h2', { class: 'sd-title' }, [`${right} de ${answered.length} correctas`]),
          el('p', {}, [share === 1 ? 'Dominas esta familia. Pruébala ahora en un duelo.' : 'Repasa los escenarios que fallaste y vuelve a intentarlo.']),
          el('div', { class: 'sd-actions' }, [button('Menú', showMenu, { class: 'sd-secondary' }), again]),
          el('h3', { class: 'sd-subtitle' }, ['Repaso']),
          reviewList(answered),
        ]),
      );
      listenKeys(null, () => again);
    }

    nextCard();
  }

  showMenu();
  return () => {
    stopTimer();
    document.removeEventListener('keydown', onKey);
  };
}
