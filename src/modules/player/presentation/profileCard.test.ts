// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { renderProfileCard } from './profileCard';

let host: HTMLElement;

describe('profile card', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
    host = document.getElementById('host')!;
  });

  it('shows the initials, name, email and chosen character', () => {
    renderProfileCard(host, { displayName: 'Andy Caseres', email: 'andy@example.com', isGuest: false, character: 'woman' });
    expect(host.querySelector('.pc-avatar')?.textContent).toBe('AC');
    expect(host.querySelector('h2')?.textContent).toBe('Andy Caseres');
    expect(host.textContent).toContain('andy@example.com');
    expect(host.textContent).toContain('Personaje: Mujer');
  });

  it('says when no character was chosen yet', () => {
    renderProfileCard(host, { displayName: 'Andy', isGuest: false, character: null });
    expect(host.textContent).toContain('Personaje: elígelo al entrar al juego');
  });

  it('speaks English when asked', () => {
    renderProfileCard(host, { displayName: 'Andy', isGuest: false, character: 'woman' }, { locale: 'en' });
    expect(host.textContent).toContain('Character: Woman');
  });
});
