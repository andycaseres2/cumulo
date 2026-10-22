import type { PlayerAuth } from '../domain/PlayerAuth';
import { renderAuthForms } from './authForms';
import { SITE_NAME } from '@/ui/site';
import './authModal.css';

export interface AuthModalOptions {
  auth: PlayerAuth;
  onSignedIn: () => void;
  /** Called when the player closes the modal without signing in. */
  onDismiss?: () => void;
  /** Why the modal opened, e.g. "Necesitas una cuenta para jugar." */
  reason?: string;
}

/**
 * Sign-in / sign-up in a native <dialog>: focus stays inside, Escape and a click on the backdrop close it.
 * The forms are the same ones used on the /ingresar page.
 */
export function openAuthModal({ auth, onSignedIn, onDismiss, reason }: AuthModalOptions): () => void {
  const dialog = document.createElement('dialog');
  dialog.className = 'auth-modal';
  dialog.setAttribute('data-auth-modal', '');
  dialog.setAttribute('aria-labelledby', 'auth-modal-title');

  const title = document.createElement('h2');
  title.id = 'auth-modal-title';
  title.className = 'auth-modal-title';
  title.textContent = `Ingresa a ${SITE_NAME}`;

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'auth-modal-close';
  close.setAttribute('data-auth-close', '');
  close.setAttribute('aria-label', 'Cerrar');
  close.textContent = '✕';

  const header = document.createElement('header');
  header.className = 'auth-modal-header';
  header.append(title, close);

  const forms = document.createElement('div');
  const body: Node[] = [header];
  if (reason) {
    const why = document.createElement('p');
    why.className = 'auth-modal-reason';
    why.textContent = reason;
    body.push(why);
  }
  body.push(forms);
  dialog.append(...body);

  let closed = false;
  const remove = () => {
    if (closed) return;
    closed = true;
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    dialog.remove();
  };
  const dismiss = () => {
    if (closed) return;
    remove();
    onDismiss?.();
  };

  renderAuthForms(forms, {
    auth,
    onSignedIn: () => {
      remove();
      onSignedIn();
    },
  });

  close.addEventListener('click', dismiss);
  // Escape fires "cancel" on a modal dialog.
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    dismiss();
  });
  // A click that lands on the dialog itself (not its content) is a click on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dismiss();
  });

  document.body.append(dialog);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  dialog.querySelector<HTMLInputElement>('input')?.focus();
  return remove;
}
