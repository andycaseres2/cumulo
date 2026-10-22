import { MIN_PASSWORD_LENGTH, NAME_LENGTH, signIn, signUp } from '../application/authenticate';
import type { AuthOutcome, PlayerAuth } from '../domain/PlayerAuth';
import { AUTH_MESSAGES, CONFIRM_EMAIL_MESSAGE } from './authMessages';
import './authForms.css';

export interface AuthFormsOptions {
  auth: PlayerAuth;
  /** Called after a successful sign-in, e.g. to go back to the game. */
  onSignedIn: () => void;
}

type Mode = 'sign-in' | 'sign-up';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function field(label: string, attrs: Record<string, string>) {
  const id = `auth-${attrs.name}-${Math.random().toString(36).slice(2, 7)}`;
  return el('div', { class: 'auth-field' }, [el('label', { for: id }, [label]), el('input', { id, ...attrs })]);
}

const EYE_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.7 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2M6.6 6.6A17.4 17.4 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="m2 2 20 20"/></svg>';

/** Password field with an eye button that shows or hides what was typed. */
function passwordField(label: string, attrs: Record<string, string>) {
  const wrapper = field(label, { ...attrs, type: 'password' });
  const input = wrapper.querySelector('input')!;
  const toggle = el('button', { type: 'button', class: 'auth-eye', 'data-password-toggle': '' });
  const render = () => {
    const visible = input.type === 'text';
    toggle.innerHTML = visible ? EYE_OFF_ICON : EYE_ICON;
    toggle.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    toggle.setAttribute('aria-pressed', String(visible));
  };
  toggle.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
    render();
  });
  render();
  const box = el('div', { class: 'auth-password' });
  input.replaceWith(box);
  box.append(input, toggle);
  return wrapper;
}

/** Sign-in and sign-up forms with tabs, validation messages and a busy state. */
export function renderAuthForms(host: HTMLElement, { auth, onSignedIn }: AuthFormsOptions) {
  const message = el('p', { class: 'auth-message', 'data-auth-message': '', role: 'alert' });

  const signInForm = el('form', { class: 'auth-form', novalidate: '' }, [
    field('Email', { name: 'email', type: 'email', autocomplete: 'email', required: '' }),
    passwordField('Contraseña', { name: 'password', autocomplete: 'current-password', required: '' }),
    el('button', { type: 'submit', class: 'auth-submit' }, ['Ingresar']),
  ]);
  const signUpForm = el('form', { class: 'auth-form', novalidate: '', hidden: '' }, [
    field('Tu nombre', { name: 'name', type: 'text', autocomplete: 'nickname', maxlength: String(NAME_LENGTH.max), required: '' }),
    field('Email', { name: 'email', type: 'email', autocomplete: 'email', required: '' }),
    passwordField(`Contraseña (mínimo ${MIN_PASSWORD_LENGTH} caracteres)`, {
      name: 'password',
      type: 'password',
      autocomplete: 'new-password',
      minlength: String(MIN_PASSWORD_LENGTH),
      required: '',
    }),
    el('button', { type: 'submit', class: 'auth-submit' }, ['Crear cuenta']),
  ]);

  const tabs = el('div', { class: 'auth-tabs', role: 'tablist' });
  const tab = (mode: Mode, label: string) => {
    const button = el('button', { type: 'button', role: 'tab', class: 'auth-tab' }, [label]);
    button.addEventListener('click', () => show(mode));
    tabs.append(button);
    return button;
  };
  const signInTab = tab('sign-in', 'Ingresar');
  const signUpTab = tab('sign-up', 'Crear cuenta');

  function show(mode: Mode) {
    signInForm.hidden = mode !== 'sign-in';
    signUpForm.hidden = mode !== 'sign-up';
    signInTab.setAttribute('aria-selected', String(mode === 'sign-in'));
    signUpTab.setAttribute('aria-selected', String(mode === 'sign-up'));
    message.textContent = '';
    message.className = 'auth-message';
  }

  function say(text: string, kind: 'error' | 'success') {
    message.textContent = text;
    message.className = `auth-message is-${kind}`;
  }

  function handle(form: HTMLFormElement, run: (data: FormData) => Promise<AuthOutcome>, onOk: (outcome: AuthOutcome & { ok: true }) => void) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
      submit.disabled = true;
      message.textContent = '';
      try {
        const outcome = await run(new FormData(form));
        if (outcome.ok) onOk(outcome);
        else say(AUTH_MESSAGES[outcome.error], 'error');
      } catch {
        say(AUTH_MESSAGES.unavailable, 'error');
      } finally {
        submit.disabled = false;
      }
    });
  }

  const value = (data: FormData, name: string) => String(data.get(name) ?? '');
  handle(signInForm, (data) => signIn(auth, { email: value(data, 'email'), password: value(data, 'password') }), () => onSignedIn());
  handle(
    signUpForm,
    (data) => signUp(auth, { name: value(data, 'name'), email: value(data, 'email'), password: value(data, 'password') }),
    (outcome) => {
      if (!outcome.needsConfirmation) {
        onSignedIn();
        return;
      }
      signUpForm.reset();
      say(CONFIRM_EMAIL_MESSAGE, 'success');
    },
  );

  host.replaceChildren(el('div', { class: 'auth-card' }, [tabs, signInForm, signUpForm, message]));
  show('sign-in');
}
