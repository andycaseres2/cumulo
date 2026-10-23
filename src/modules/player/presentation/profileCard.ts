import { playerMessages } from '@/i18n/messages/player';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { initials, type Player } from '../domain/Player';
import './profileCard.css';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

export interface ProfileCardOptions {
  /** Language of the copy; Spanish when omitted. */
  locale?: Locale;
}

/** The player's identity at the top of the profile: avatar, name, email and character. */
export function renderProfileCard(host: HTMLElement, player: Player, { locale = DEFAULT_LOCALE }: ProfileCardOptions = {}): void {
  const t = playerMessages[locale].profile;
  const character = player.character ? t.characters[player.character] : t.noCharacter;
  host.replaceChildren(
    el('section', { class: 'profile-card' }, [
      el('span', { class: 'pc-avatar', 'aria-hidden': 'true' }, [initials(player.displayName)]),
      el('div', { class: 'pc-who' }, [
        el('h2', { class: 'pc-name' }, [player.displayName]),
        ...(player.email ? [el('p', { class: 'pc-detail' }, [player.email])] : []),
        el('p', { class: 'pc-detail' }, [t.character(character)]),
      ]),
    ]),
  );
}
