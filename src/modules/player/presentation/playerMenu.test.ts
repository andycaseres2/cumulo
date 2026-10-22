// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderPlayerMenu } from './playerMenu';

const player = { displayName: 'Andy Caseres', email: 'andy@example.com', isGuest: false, character: 'man' as const };
let host: HTMLElement;
const trigger = () => host.querySelector<HTMLButtonElement>('[data-menu-trigger]')!;
const menu = () => host.querySelector<HTMLElement>('[data-menu]')!;

function render(onSignOut = vi.fn(async () => {})) {
  renderPlayerMenu(host, { player, profileUrl: '/profile', onSignOut });
  return onSignOut;
}

describe('player menu', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div><p id="outside">outside</p>';
    host = document.getElementById('host')!;
  });

  it('shows a round avatar with the player initials, closed at first', () => {
    render();
    expect(trigger().textContent).toContain('AC');
    expect(trigger().getAttribute('aria-label')).toBe('Menú de Andy Caseres');
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(menu().hidden).toBe(true);
  });

  it('opens on click with the player info, the profile link and sign out', () => {
    render();
    trigger().click();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(menu().hidden).toBe(false);
    expect(menu().textContent).toContain('Andy Caseres');
    expect(menu().textContent).toContain('andy@example.com');
    expect(menu().querySelector('a[href="/profile"]')?.textContent).toContain('Mi perfil');
  });

  it('closes with Escape, an outside click or a second click on the avatar', () => {
    render();
    trigger().click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(menu().hidden).toBe(true);

    trigger().click();
    document.getElementById('outside')!.click();
    expect(menu().hidden).toBe(true);

    trigger().click();
    trigger().click();
    expect(menu().hidden).toBe(true);
  });

  it('signs out from the menu', () => {
    const onSignOut = render();
    trigger().click();
    const button = [...menu().querySelectorAll('button')].find((b) => b.textContent?.includes('Salir'))!;
    button.click();
    expect(onSignOut).toHaveBeenCalledOnce();
    expect(button.disabled).toBe(true);
  });
});
