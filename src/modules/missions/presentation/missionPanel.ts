import { answer, currentDecision, isFinished, runResult, startRun, type MissionResult, type MissionRun } from '../domain/MissionRun';
import type { Mission, MissionMode } from '../domain/Mission';
import './missionPanel.css';

export interface MissionPanelOptions {
  mission: Mission;
  /** Element the panel is appended to (it covers it). */
  host: HTMLElement;
  /** URL of a theory topic, opened in a new tab. */
  theoryUrl: (slug: string) => string;
}

type Child = Node | string;

function el(tag: string, attrs: Record<string, string> = {}, children: Child[] = []): HTMLElement {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function button(label: string, onClick: () => void, attrs: Record<string, string> = {}): HTMLButtonElement {
  const node = el('button', { type: 'button', ...attrs }, [label]) as HTMLButtonElement;
  node.addEventListener('click', onClick);
  return node;
}

const percent = (score: number) => `${Math.round(score * 100)} %`;

/**
 * Plays a mission in an overlay: mode choice, decisions, explanations and results.
 * Resolves with the result when the player finishes, or null if they leave early.
 */
export function openMissionPanel({ mission, host, theoryUrl }: MissionPanelOptions): Promise<MissionResult | null> {
  return new Promise((resolve) => {
    let run: MissionRun | null = null;
    let waitingForNext = false;

    const body = el('div', { class: 'mp-body' });
    const close = button('Salir ✕', () => finish(null), { class: 'mp-close', 'aria-label': 'Salir de la misión' });
    const root = el('section', { class: 'mission-panel', 'data-mission-panel': '', role: 'dialog', 'aria-modal': 'true', 'aria-label': mission.title }, [
      el('div', { class: 'mp-card' }, [
        el('header', { class: 'mp-header' }, [
          el('div', {}, [
            el('p', { class: 'mp-eyebrow' }, [`Misión · ${mission.client.name}`]),
            el('h2', { class: 'mp-title' }, [mission.title]),
          ]),
          close,
        ]),
        body,
      ]),
    ]);

    function finish(result: MissionResult | null) {
      root.remove();
      resolve(result);
    }

    function show(...children: Child[]) {
      body.replaceChildren(...children);
      body.scrollTop = 0;
      body.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
    }

    function heading(text: string) {
      return el('h3', { class: 'mp-heading', tabindex: '-1' }, [text]);
    }

    function theoryLink(slug: string) {
      return el('a', { class: 'mp-theory', 'data-theory-link': '', href: theoryUrl(slug), target: '_blank', rel: 'noopener' }, [
        'Repasar este tema en la teoría ↗',
      ]);
    }

    function renderModes() {
      const mode = (value: MissionMode, title: string, text: string) =>
        el('li', {}, [
          button(title, () => {
            run = startRun(mission, value);
            renderDecision();
          }, { class: 'mp-mode' }),
          el('p', {}, [text]),
        ]);
      show(
        heading('¿Cómo quieres jugar?'),
        el('ul', { class: 'mp-modes' }, [
          mode('learn', 'Aprender', 'Ves qué es cada servicio antes de elegir y la explicación justo después de cada respuesta. Ideal si recién empiezas.'),
          mode('practice', 'Práctica', 'Como en el examen: sin definiciones ni pistas. Al final ves tu puntaje y la explicación de cada respuesta.'),
        ]),
      );
    }

    function renderDecision() {
      const decision = run && currentDecision(run, mission);
      if (!run || !decision) return;
      const learning = run.mode === 'learn';
      waitingForNext = false;
      const list = el(
        'ol',
        { class: 'mp-options' },
        decision.options.map((option, i) =>
          el('li', {}, [
            button(`${i + 1}. ${option.label}`, () => choose(option.id), { class: 'mp-option', 'data-option': option.id }),
            ...(learning ? [el('details', {}, [el('summary', {}, ['¿Qué es esto?']), el('p', {}, [option.definition])])] : []),
          ]),
        ),
      );
      show(
        el('p', { class: 'mp-progress' }, [
          `Decisión ${run.answers.length + 1} de ${mission.decisions.length}`,
          el('span', { class: 'mp-badge' }, [learning ? 'Aprender' : 'Práctica']),
        ]),
        el('blockquote', { class: 'mp-quote' }, [el('strong', {}, [mission.client.name]), el('p', {}, [decision.prompt])]),
        heading('¿Qué le recomiendas?'),
        list,
      );
    }

    function choose(optionId: string) {
      if (!run || waitingForNext) return;
      const decision = currentDecision(run, mission)!;
      const step = answer(run, mission, optionId);
      run = step.run;
      if (run.mode === 'practice') {
        if (isFinished(run, mission)) renderResults();
        else renderDecision();
        return;
      }

      waitingForNext = true;
      for (const node of body.querySelectorAll<HTMLButtonElement>('[data-option]')) {
        node.disabled = true;
        if (node.dataset.option === step.feedback.correctOption.id) node.classList.add('is-correct');
        else if (node.dataset.option === optionId) node.classList.add('is-wrong');
      }
      const { feedback } = step;
      const finished = isFinished(run, mission);
      body.append(
        el('div', { class: `mp-feedback ${feedback.correct ? 'is-correct' : 'is-wrong'}`, 'data-feedback': '', role: 'status' }, [
          el('h4', {}, [feedback.correct ? '✓ ¡Correcto!' : '✗ No es la mejor opción']),
          el('p', {}, [feedback.chosen.explanation]),
          ...(feedback.correct
            ? []
            : [el('p', {}, [el('strong', {}, [`La respuesta correcta: ${feedback.correctOption.label}. `]), feedback.correctOption.explanation])]),
          theoryLink(decision.topicSlug),
          button(finished ? 'Ver resultado' : 'Siguiente', () => (finished ? renderResults() : renderDecision()), { class: 'mp-primary' }),
        ]),
      );
      body.querySelector<HTMLButtonElement>('.mp-primary')?.focus({ preventScroll: true });
      // The feedback is appended at the end: scroll only the panel body, never the game behind it.
      body.scrollTop = body.scrollHeight;
    }

    function renderResults() {
      if (!run) return;
      const result = runResult(run, mission);
      const review = result.review.map((entry, i) =>
        el('li', { class: entry.correct ? 'is-correct' : 'is-wrong' }, [
          el('p', { class: 'mp-review-question' }, [`${i + 1}. ${entry.decision.prompt}`]),
          el('p', {}, [`${entry.correct ? '✓' : '✗'} Tu respuesta: ${entry.chosen.label}`]),
          ...(entry.correct ? [] : [el('p', {}, [`Correcta: ${entry.correctOption.label}`])]),
          el('p', { class: 'mp-review-why' }, [entry.correctOption.explanation]),
          theoryLink(entry.decision.topicSlug),
        ]),
      );
      show(
        heading(result.passed ? '¡Misión cumplida!' : 'Todavía no'),
        el('p', { class: 'mp-score' }, [`${result.correct} de ${result.total} correctas (${percent(result.score)})`]),
        el('p', {}, [
          result.passed
            ? 'Resolviste el problema del cliente. Repasa abajo cada decisión para fijar lo aprendido.'
            : `Necesitas ${percent(mission.passingScore)} para completar la misión. Lee las explicaciones y vuelve a intentarlo.`,
        ]),
        el('ol', { class: 'mp-review' }, review),
        button('Volver a la oficina', () => finish(result), { class: 'mp-primary' }),
      );
    }

    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        finish(null);
        return;
      }
      const index = Number(event.key) - 1;
      const target = body.querySelectorAll<HTMLButtonElement>('[data-option]')[index];
      if (target && !target.disabled) target.click();
    });

    host.append(root);
    renderModes();
  });
}
