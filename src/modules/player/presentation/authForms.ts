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

/** Sign-in and sign-up forms with tabs, validation messages and a busy state. */
export function renderAuthForms(host: HTMLElement, { auth, onSignedIn }: AuthFormsOptions) {
  const message = el('p', { class: 'auth-message', 'data-auth-message': '', role: 'alert' });

  const signInForm = el('form', { class: 'auth-form', novalidate: '' }, [
    field('Email', { name: 'email', type: 'email', autocomplete: 'email', required: '' }),
    field('Contraseña', { name: 'password', type: 'password', autocomplete: 'current-password', required: '' }),
    el('button', { type: 'submit', class: 'auth-submit' }, ['Ingresar']),
  ]);
  const signUpForm = el('form', { class: 'auth-form', novalidate: '', hidden: '' }, [
    field('Tu nombre', { name: 'name', type: 'text', autocomplete: 'nickname', maxlength: String(NAME_LENGTH.max), required: '' }),
    field('Email', { name: 'email', type: 'email', autocomplete: 'email', required: '' }),
    field(`Contraseña (mínimo ${MIN_PASSWORD_LENGTH} caracteres)`, {
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
