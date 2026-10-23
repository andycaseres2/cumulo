import { missionMessages } from '@/i18n/messages/missions';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { Mission } from '../domain/Mission';
import {
  answer,
  consultManual,
  currentDecision,
  isFinished,
  jobFee,
  runResult,
  satisfaction,
  startRun,
  type MissionResult,
  type MissionRun,
} from '../domain/MissionRun';
import './missionPanel.css';

export interface MissionPanelOptions {
  mission: Mission;
  /** Element the panel is appended to (it covers it). */
  host: HTMLElement;
  /** URL of a theory topic, opened in a new tab. */
  theoryUrl: (slug: string) => string;
  /** Language of the copy; Spanish when omitted. */
  locale?: Locale;
}

type Child = Node | string;

function el(tag: string, attrs: Record<string, string> = {}, children: Child[] = []): HTMLElement {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function button(label: Child | Child[], onClick: () => void, attrs: Record<string, string> = {}): HTMLButtonElement {
  const node = el('button', { type: 'button', ...attrs }, Array.isArray(label) ? label : [label]) as HTMLButtonElement;
  node.addEventListener('click', onClick);
  return node;
}

const percent = (share: number) => `${Math.round(share * 100)} %`;
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => /^\p{Lu}/u.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

/**
 * Plays a mission as a consulting job in an overlay: the work order, each client request with instant
 * consequences and a senior consultant's note, the client's satisfaction, and a closing report with stars
 * and fees. Resolves with the result when the player goes back to the office, or null if they leave early.
 */
export function openMissionPanel({ mission, host, theoryUrl, locale = DEFAULT_LOCALE }: MissionPanelOptions): Promise<MissionResult | null> {
  const t = missionMessages[locale].panel;
  return new Promise((resolve) => {
    let run: MissionRun = startRun(mission);
    let waitingForNext = false;

    const body = el('div', { class: 'mp-body' });
    const close = button(t.exit, () => finish(null), { class: 'mp-close', 'aria-label': t.exitLabel });
    const root = el('section', { class: 'mission-panel', 'data-mission-panel': '', role: 'dialog', 'aria-modal': 'true', 'aria-label': mission.title }, [
      el('div', { class: 'mp-card' }, [
        el('header', { class: 'mp-header' }, [
          el('div', {}, [el('p', { class: 'mp-eyebrow' }, [t.workOrder]), el('h2', { class: 'mp-title' }, [mission.title])]),
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

    const heading = (text: string) => el('h3', { class: 'mp-heading', tabindex: '-1' }, [text]);
    const avatar = () => el('span', { class: 'mp-avatar', 'aria-hidden': 'true' }, [initials(mission.client.name)]);
    const theoryLink = (slug: string) =>
      el('a', { class: 'mp-theory', 'data-theory-link': '', href: theoryUrl(slug), target: '_blank', rel: 'noopener' }, [t.theoryLink]);
    /** The client speaking, in a chat bubble next to their portrait. */
    const bubble = (text: string, tone = '') =>
      el('div', { class: `mp-chat ${tone}`.trim() }, [
        avatar(),
        el('div', { class: 'mp-bubble' }, [el('strong', {}, [mission.client.name]), el('p', {}, [text])]),
      ]);

    function satisfactionMeter(value: number) {
      return el('div', { class: value < 40 ? 'mp-meter is-low' : 'mp-meter', 'data-satisfaction': String(value) }, [
        el('div', { class: 'mp-meter-label' }, [el('span', {}, [t.satisfaction]), el('span', { class: 'mp-meter-value' }, [`${value} %`])]),
        el('div', { class: 'mp-meter-track' }, [el('div', { class: 'mp-meter-fill', style: `width: ${value}%` })]),
      ]);
    }

    function setMeter(value: number) {
      const meter = body.querySelector<HTMLElement>('.mp-meter');
      if (!meter) return;
      meter.dataset.satisfaction = String(value);
      meter.querySelector<HTMLElement>('.mp-meter-fill')!.style.width = `${value}%`;
      meter.querySelector('.mp-meter-value')!.textContent = `${value} %`;
      meter.classList.toggle('is-low', value < 40);
    }

    function renderWorkOrder() {
      run = startRun(mission);
      show(
        el('div', { class: 'mp-order' }, [
          el('div', { class: 'mp-client' }, [avatar(), el('div', {}, [el('p', { class: 'mp-client-name' }, [t.client(mission.client.name, mission.client.role)])])]),
          heading(t.briefing),
          el('div', { class: 'mp-briefing' }, mission.intro.map((page) => el('p', {}, [page]))),
          el('ul', { class: 'mp-terms' }, [
            el('li', {}, [t.requests(mission.decisions.length)]),
            el('li', {}, [t.toApprove(percent(mission.passingScore))]),
            el('li', {}, [t.manualNote]),
            el('li', { class: 'mp-fee' }, [t.feeUpTo(jobFee(mission, 3))]),
          ]),
          button(t.take, renderRequest, { class: 'mp-primary', 'data-take-job': '' }),
        ]),
      );
    }

    function renderRequest() {
      const decision = currentDecision(run, mission);
      if (!decision) return;
      waitingForNext = false;
      const manualOpen = run.manualUsed.includes(decision.id);
      const options = el(
        'ol',
        { class: 'mp-options' },
        decision.options.map((option, i) =>
          el('li', {}, [
            button([el('span', { class: 'mp-key' }, [String(i + 1)]), el('span', {}, [option.label])], () => choose(option.id), {
              class: 'mp-option',
              'data-option': option.id,
            }),
            el('p', { class: 'mp-definition', 'data-definition': '', ...(manualOpen ? {} : { hidden: '' }) }, [option.definition]),
          ]),
        ),
      );
      const manual = button(manualOpen ? t.manualOpen : t.manual, openManual, { class: 'mp-manual', 'data-manual': '', ...(manualOpen ? { disabled: '' } : {}) });
      show(
        el('div', { class: 'mp-status' }, [
          el('p', { class: 'mp-progress' }, [t.request(run.answers.length + 1, mission.decisions.length)]),
          satisfactionMeter(satisfaction(run, mission)),
        ]),
        bubble(decision.prompt),
        heading(t.propose),
        options,
        manual,
      );
    }

    function openManual() {
      run = consultManual(run, mission);
      for (const definition of body.querySelectorAll<HTMLElement>('[data-definition]')) definition.hidden = false;
      const manual = body.querySelector<HTMLButtonElement>('[data-manual]')!;
      manual.textContent = t.manualOpen;
      manual.disabled = true;
    }

    function choose(optionId: string) {
      if (waitingForNext) return;
      const decision = currentDecision(run, mission)!;
      const step = answer(run, mission, optionId);
      run = step.run;
      waitingForNext = true;
      const { feedback } = step;

      for (const node of body.querySelectorAll<HTMLButtonElement>('[data-option]')) {
        node.disabled = true;
        if (node.dataset.option === feedback.correctOption.id) node.classList.add('is-correct');
        else if (node.dataset.option === optionId) node.classList.add('is-wrong');
      }
      body.querySelector<HTMLButtonElement>('[data-manual]')?.setAttribute('hidden', '');
      setMeter(satisfaction(run, mission));

      // The client reacts in their own words; the senior consultant explains why.
      const pool = feedback.correct ? t.reactionsGood : t.reactionsBad;
      const index = run.answers.length - 1;
      const finished = isFinished(run, mission);
      body.append(
        el('div', { class: `mp-outcome ${feedback.correct ? 'is-correct' : 'is-wrong'}`, 'data-feedback': '', role: 'status' }, [
          el('p', { class: 'mp-verdict' }, [feedback.correct ? t.good : t.bad]),
          bubble(pool[index % pool.length], feedback.correct ? 'is-happy' : 'is-upset'),
          el('div', { class: 'mp-note' }, [
            el('p', { class: 'mp-note-title' }, [t.seniorNote]),
            el('p', {}, [feedback.chosen.explanation]),
            ...(feedback.correct ? [] : [el('p', {}, [el('strong', {}, [t.betterProposal(feedback.correctOption.label)]), ' ', feedback.correctOption.explanation])]),
            theoryLink(decision.topicSlug),
          ]),
          button(finished ? t.seeReport : t.next, () => (finished ? renderReport() : renderRequest()), { class: 'mp-primary', 'data-next': '' }),
        ]),
      );
      body.querySelector<HTMLButtonElement>('[data-next]')?.focus({ preventScroll: true });
      // The outcome is appended at the end: scroll only the panel body, never the game behind it.
      body.scrollTop = body.scrollHeight;
    }

    function renderReport() {
      const result = runResult(run, mission);
      const stars = el(
        'p',
        { class: 'mp-stars', 'data-stars': String(result.stars), 'aria-label': t.stars(result.stars) },
        [0, 1, 2].map((i) => el('span', { class: i < result.stars ? 'is-on' : '' }, ['★'])),
      );
      const criteria = [
        [result.passed, t.criteria.approved],
        [result.correct === result.total, t.criteria.allRight],
        [run.manualUsed.length === 0, t.criteria.noManual],
      ] as const;
      const learned = result.review.map((entry, i) =>
        el('li', { class: entry.correct ? 'is-correct' : 'is-wrong' }, [
          el('p', { class: 'mp-review-question' }, [`${i + 1}. ${entry.decision.prompt}`]),
          el('p', {}, [t.yourProposal(entry.correct ? '✓' : '✗', entry.chosen.label)]),
          ...(entry.correct ? [] : [el('p', {}, [t.rightProposal(entry.correctOption.label)])]),
          el('p', { class: 'mp-review-why' }, [entry.correctOption.explanation]),
          theoryLink(entry.decision.topicSlug),
        ]),
      );
      show(
        el('div', { class: `mp-report ${result.passed ? 'is-approved' : 'is-rejected'}`, 'data-report': result.passed ? 'approved' : 'rejected' }, [
          el('p', { class: 'mp-eyebrow' }, [t.report]),
          heading(result.passed ? t.approved : t.rejected),
          stars,
          el('ul', { class: 'mp-criteria' }, criteria.map(([met, label]) => el('li', { class: met ? 'is-met' : '' }, [met ? '✓ ' : '✗ ', label]))),
          el('p', { class: 'mp-report-fee', 'data-fee': String(result.fee) }, [result.passed ? t.fee(result.fee) : t.noFee]),
          satisfactionMeter(result.satisfaction),
          el('p', {}, [t.answers(result.correct, result.total)]),
          el('p', {}, [result.passed ? t.approvedText(mission.client.name) : t.rejectedText(mission.client.name, percent(mission.passingScore))]),
          el('div', { class: 'mp-actions' }, [
            button(t.retry, renderWorkOrder, { class: 'mp-secondary', 'data-retry': '' }),
            button(t.backToOffice, () => finish(result), { class: 'mp-primary', 'data-back': '' }),
          ]),
          el('h4', { class: 'mp-subheading' }, [t.learned]),
          el('ol', { class: 'mp-review' }, learned),
        ]),
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
    renderWorkOrder();
  });
}
