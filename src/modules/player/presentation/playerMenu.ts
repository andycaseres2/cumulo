import { initials, type Player } from '../domain/Player';
import './playerMenu.css';

export interface PlayerMenuOptions {
  player: Player;
  profileUrl: string;
  onSignOut: () => Promise<void>;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

// Listeners on the document from the previous render of each host, removed when it renders again.
const previousRender = new WeakMap<HTMLElement, AbortController>();

/** Round avatar with the player's initials that opens a menu with their info, the profile and sign out. */
export function renderPlayerMenu(host: HTMLElement, { player, profileUrl, onSignOut }: PlayerMenuOptions): void {
  previousRender.get(host)?.abort();
  const controller = new AbortController();
  previousRender.set(host, controller);
  const { signal } = controller;
  const id = `player-menu-${Math.random().toString(36).slice(2, 7)}`;
  const trigger = el('button', {
    type: 'button',
    class: 'pm-avatar',
    'data-menu-trigger': '',
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
    'aria-controls': id,
    'aria-label': `Menú de ${player.displayName}`,
  }, [initials(player.displayName)]);

  const signOut = el('button', { type: 'button', class: 'pm-item pm-sign-out' }, ['Salir']);
  const menu = el('div', { id, class: 'pm-menu', 'data-menu': '', hidden: '' }, [
    el('div', { class: 'pm-info' }, [
      el('span', { class: 'pm-avatar pm-avatar-large', 'aria-hidden': 'true' }, [initials(player.displayName)]),
      el('div', { class: 'pm-who' }, [
        el('p', { class: 'pm-name' }, [player.displayName]),
        ...(player.email ? [el('p', { class: 'pm-email' }, [player.email])] : []),
      ]),
    ]),
    el('a', { class: 'pm-item', href: profileUrl }, ['Mi perfil']),
    signOut,
  ]);

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.addEventListener('click', () => setOpen(menu.hidden));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      trigger.focus();
    }
  }, { signal });
  document.addEventListener('click', (event) => {
    if (!host.contains(event.target as Node)) setOpen(false);
  }, { signal });
  signOut.addEventListener('click', () => {
    signOut.disabled = true;
    void onSignOut();
  });

  host.replaceChildren(el('div', { class: 'player-menu' }, [trigger, menu]));
}
