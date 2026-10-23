import { missionMessages } from '@/i18n/messages/missions';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { EXAM_DOMAINS } from '@/modules/exam/domain/ExamDomain';
import { domainText } from '@/modules/exam/presentation/examText';
import type { CampaignEntry, CampaignOverview } from '../application/campaignOverview';
import type { MissionState } from '../domain/MissionProgress';
import './progressView.css';

export interface ProgressViewOptions {
  gameUrl: string;
  theoryUrl: (slug: string) => string;
  buildingName: (buildingId: string) => string;
  topicTitle: (slug: string) => string;
  /** Name of a campaign track (in Cúmulo City, a district). */
  trackName: (track: string) => string;
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

const percent = (score: number) => `${Math.round(score * 100)} %`;

const messages = (options: ProgressViewOptions) => missionMessages[options.locale ?? DEFAULT_LOCALE].progress;

function stateLabel({ state, bestScore }: CampaignEntry, labels: Record<MissionState, string>): string {
  return state === 'completed' && bestScore !== null ? `${labels.completed} · ${percent(bestScore)}` : labels[state];
}

function missionCard(entry: CampaignEntry, options: ProgressViewOptions): HTMLElement {
  const { mission, state } = entry;
  const t = messages(options);
  const topics = [...new Set(mission.decisions.map((d) => d.topicSlug))];
  const card = el('li', { class: 'pv-mission', 'data-mission': mission.id, 'data-state': state }, [
    el('div', { class: 'pv-mission-head' }, [
      el('div', {}, [
        el('p', { class: 'pv-building' }, [options.buildingName(mission.buildingId)]),
        el('h3', { class: 'pv-title' }, [state === 'locked' ? t.lockedTitle : mission.title]),
        el('p', { class: 'pv-client' }, [`${mission.client.name} · ${mission.client.role}`]),
      ]),
      el('span', { class: 'pv-state' }, [stateLabel(entry, t.states)]),
    ]),
  ]);
  // The theory behind a mission is shown once it was solved, as a way to review it.
  if (state === 'completed') {
    card.append(
      el('p', { class: 'pv-topics-label' }, [t.reviewTheory]),
      el(
        'ul',
        { class: 'pv-topics' },
        topics.map((slug) => el('li', {}, [el('a', { href: options.theoryUrl(slug) }, [options.topicTitle(slug)])])),
      ),
    );
  }
  return card;
}

/**
 * One collapsible group per track, in campaign order, with how many of its missions are completed.
 * The group with the active mission starts open (the first one when nothing is active).
 */
function trackGroups(entries: CampaignEntry[], options: ProgressViewOptions): HTMLElement[] {
  const tracks = [...new Set(entries.map((e) => e.mission.track))];
  const openTrack = entries.find((e) => e.state === 'active')?.mission.track ?? tracks[0];
  return tracks.map((track) => {
    const inTrack = entries.filter((e) => e.mission.track === track);
    const done = inTrack.filter((e) => e.state === 'completed').length;
    return el('details', { class: 'pv-track', 'data-track': track, ...(track === openTrack ? { open: '' } : {}) }, [
      el('summary', { class: 'pv-track-summary' }, [
        el('span', {}, [options.trackName(track)]),
        el('span', { class: 'pv-track-count' }, [messages(options).trackCount(done, inTrack.length)]),
      ]),
      el('ol', { class: 'pv-missions' }, inTrack.map((entry) => missionCard(entry, options))),
    ]);
  });
}

/** Renders the player's campaign progress: summary, exam domains practiced and every mission. */
export function renderProgress(host: HTMLElement, overview: CampaignOverview, options: ProgressViewOptions): void {
  const practiced = new Set(overview.practicedDomains);
  const locale = options.locale ?? DEFAULT_LOCALE;
  const t = messages(options);
  host.replaceChildren(
    el('section', { class: 'progress-view' }, [
      el('div', { class: 'pv-summary' }, [
        el('p', { class: 'pv-count' }, [t.count(overview.completed, overview.total)]),
        el('progress', { value: String(overview.completed), max: String(overview.total), 'aria-label': t.label }),
        el('a', { class: 'pv-play', href: options.gameUrl }, [overview.completed === 0 ? t.startPlaying : t.keepPlaying]),
      ]),
      el('h2', { class: 'pv-heading' }, [t.domainsHeading]),
      el(
        'ul',
        { class: 'pv-domains' },
        EXAM_DOMAINS.map((d) =>
          el('li', { class: 'pv-domain', 'data-domain': d.id, 'data-practiced': String(practiced.has(d.id)) }, [
            el('span', { class: 'pv-domain-mark', 'aria-hidden': 'true' }, [practiced.has(d.id) ? '✓' : '·']),
            `${d.order}. ${domainText(d, locale).title}`,
            el('span', { class: 'visually-hidden' }, [practiced.has(d.id) ? t.practiced : t.pending]),
          ]),
        ),
      ),
      el('h2', { class: 'pv-heading' }, [t.missionsHeading]),
      ...trackGroups(overview.entries, options),
    ]),
  );
}
