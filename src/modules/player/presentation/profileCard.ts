import { initials, type Character, type Player } from '../domain/Player';
import './profileCard.css';

const CHARACTER_NAMES: Record<Character, string> = { man: 'Hombre', woman: 'Mujer' };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

/** The player's identity at the top of the profile: avatar, name, email and character. */
export function renderProfileCard(host: HTMLElement, player: Player): void {
  const character = player.character ? CHARACTER_NAMES[player.character] : 'elígelo al entrar al juego';
  host.replaceChildren(
    el('section', { class: 'profile-card' }, [
      el('span', { class: 'pc-avatar', 'aria-hidden': 'true' }, [initials(player.displayName)]),
      el('div', { class: 'pc-who' }, [
        el('h2', { class: 'pc-name' }, [player.displayName]),
        ...(player.email ? [el('p', { class: 'pc-detail' }, [player.email])] : []),
        el('p', { class: 'pc-detail' }, [`Personaje: ${character}`]),
      ]),
    ]),
  );
}
