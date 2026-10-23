import type { DuelProgress } from '../domain/DuelProgress';
import type { Rival } from '../domain/Rival';
import './duelProgressView.css';

export interface DuelProgressViewOptions {
  rivals: Rival[];
  familyCount: number;
  gameUrl: string;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

/** The player's Service Duel achievements, for the profile. */
export function renderDuelProgress(host: HTMLElement, progress: DuelProgress, { rivals, familyCount, gameUrl }: DuelProgressViewOptions): void {
  const beaten = rivals.filter((rival) => progress.beatenRivals.includes(rival.id));
  const trained = Object.values(progress.bestPractice);
  const mastered = trained.filter((share) => share === 1).length;
  const played = beaten.length > 0 || progress.bestTimeAttack > 0 || trained.length > 0;
  host.replaceChildren(
    el('section', { class: 'duel-progress' }, [
      el('p', { class: 'dp-count' }, [`${beaten.length} de ${rivals.length} rivales vencidos`]),
      el(
        'ol',
        { class: 'dp-rivals' },
        rivals.map((rival) => el('li', { 'data-rival': rival.id, class: progress.beatenRivals.includes(rival.id) ? 'is-beaten' : '' }, [rival.name])),
      ),
      el('p', {}, [progress.bestTimeAttack > 0 ? `Récord en contrarreloj: ${progress.bestTimeAttack} aciertos` : 'Aún no juegas contrarreloj']),
      el('p', {}, [`${trained.length} de ${familyCount} familias entrenadas, ${mastered} ${mastered === 1 ? 'dominada' : 'dominadas'}`]),
      el('a', { class: 'dp-play', href: gameUrl }, [played ? 'Seguir jugando' : 'Jugar el duelo']),
    ]),
  );
}
