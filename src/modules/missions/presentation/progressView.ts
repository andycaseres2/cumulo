import { EXAM_DOMAINS } from '@/modules/exam/domain/ExamDomain';
import type { CampaignEntry, CampaignOverview } from '../application/campaignOverview';
import type { MissionState } from '../domain/MissionProgress';
import './progressView.css';

export interface ProgressViewOptions {
  gameUrl: string;
  theoryUrl: (slug: string) => string;
  buildingName: (buildingId: string) => string;
  topicTitle: (slug: string) => string;
}

type Child = Node | string;

function el(tag: string, attrs: Record<string, string> = {}, children: Child[] = []): HTMLElement {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

const percent = (score: number) => `${Math.round(score * 100)} %`;

const STATE_LABELS: Record<MissionState, string> = {
  completed: 'Completada',
  active: 'En curso',
  offered: 'Disponible',
  locked: 'Bloqueada',
};

function stateLabel({ state, bestScore }: CampaignEntry): string {
  return state === 'completed' && bestScore !== null ? `${STATE_LABELS.completed} · ${percent(bestScore)}` : STATE_LABELS[state];
}

function missionCard(entry: CampaignEntry, options: ProgressViewOptions): HTMLElement {
  const { mission, state } = entry;
  const topics = [...new Set(mission.decisions.map((d) => d.topicSlug))];
  const card = el('li', { class: 'pv-mission', 'data-mission': mission.id, 'data-state': state }, [
    el('div', { class: 'pv-mission-head' }, [
      el('div', {}, [
        el('p', { class: 'pv-building' }, [options.buildingName(mission.buildingId)]),
        el('h3', { class: 'pv-title' }, [state === 'locked' ? 'Misión por descubrir' : mission.title]),
        el('p', { class: 'pv-client' }, [`${mission.client.name} · ${mission.client.role}`]),
      ]),
      el('span', { class: 'pv-state' }, [stateLabel(entry)]),
    ]),
  ]);
  // The theory behind a mission is shown once it was solved, as a way to review it.
  if (state === 'completed') {
    card.append(
      el('p', { class: 'pv-topics-label' }, ['Repasa la teoría:']),
      el(
        'ul',
        { class: 'pv-topics' },
        topics.map((slug) => el('li', {}, [el('a', { href: options.theoryUrl(slug) }, [options.topicTitle(slug)])])),
      ),
    );
  }
  return card;
}

/** Renders the player's campaign progress: summary, exam domains practiced and every mission. */
export function renderProgress(host: HTMLElement, overview: CampaignOverview, options: ProgressViewOptions): void {
  const practiced = new Set(overview.practicedDomains);
  host.replaceChildren(
    el('section', { class: 'progress-view' }, [
      el('div', { class: 'pv-summary' }, [
        el('p', { class: 'pv-count' }, [`${overview.completed} de ${overview.total} misiones completadas`]),
        el('progress', { value: String(overview.completed), max: String(overview.total), 'aria-label': 'Avance de la campaña' }),
        el('a', { class: 'pv-play', href: options.gameUrl }, [overview.completed === 0 ? 'Empezar a jugar' : 'Seguir jugando']),
      ]),
      el('h2', { class: 'pv-heading' }, ['Dominios del examen practicados']),
      el(
        'ul',
        { class: 'pv-domains' },
        EXAM_DOMAINS.map((d) =>
          el('li', { class: 'pv-domain', 'data-domain': d.id, 'data-practiced': String(practiced.has(d.id)) }, [
            el('span', { class: 'pv-domain-mark', 'aria-hidden': 'true' }, [practiced.has(d.id) ? '✓' : '·']),
            `${d.order}. ${d.title}`,
            el('span', { class: 'visually-hidden' }, [practiced.has(d.id) ? ' (practicado)' : ' (pendiente)']),
          ]),
        ),
      ),
      el('h2', { class: 'pv-heading' }, ['Misiones']),
      el('ol', { class: 'pv-missions' }, overview.entries.map((entry) => missionCard(entry, options))),
    ]),
  );
}
