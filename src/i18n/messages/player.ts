import type { AuthErrorKind } from '@/modules/player/domain/PlayerAuth';
import type { Character } from '@/modules/player/domain/Player';
import { defineMessages } from '../defineMessages';

interface Limits {
  nameMin: number;
  nameMax: number;
  passwordMin: number;
}

/** Player UI: sign-in and sign-up forms, the account service errors, the sign-in dialog, the player menu and profile card. */
export const playerMessages = defineMessages<{
  auth: {
    email: string;
    password: string;
    passwordWithMin: (min: number) => string;
    name: string;
    signIn: string;
    signUp: string;
    showPassword: string;
    hidePassword: string;
    confirmEmail: string;
    errors: (limits: Limits) => Record<AuthErrorKind, string>;
  };
  modal: { title: (site: string) => string; close: string };
  menu: { label: (name: string) => string; profile: string; signOut: string };
  profile: { characters: Record<Character, string>; noCharacter: string; character: (name: string) => string };
}>({
  es: {
    auth: {
      email: 'Email',
      password: 'Contraseña',
      passwordWithMin: (min) => `Contraseña (mínimo ${min} caracteres)`,
      name: 'Tu nombre',
      signIn: 'Ingresar',
      signUp: 'Crear cuenta',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      confirmEmail: '¡Cuenta creada! Revisa tu correo y abre el enlace de confirmación. Después vuelve aquí para ingresar.',
      errors: ({ nameMin, nameMax, passwordMin }) => ({
        'invalid-name': `Tu nombre debe tener entre ${nameMin} y ${nameMax} caracteres.`,
        'invalid-email': 'Revisa tu email: no parece válido.',
        'missing-password': 'Escribe tu contraseña.',
        'weak-password': `La contraseña debe tener al menos ${passwordMin} caracteres.`,
        'invalid-credentials': 'Email o contraseña incorrectos.',
        'email-not-confirmed': 'Confirma tu email antes de ingresar: revisa tu bandeja de entrada y la de spam.',
        'user-exists': 'Ya existe una cuenta con ese email. Prueba ingresar.',
        'rate-limited': 'Demasiados intentos. Espera unos minutos y vuelve a probar.',
        unavailable: 'No pudimos conectar con el servicio de cuentas. Revisa tu conexión o intenta más tarde.',
        unknown: 'Algo salió mal. Intenta de nuevo.',
      }),
    },
    modal: { title: (site) => `Ingresa a ${site}`, close: 'Cerrar' },
    menu: { label: (name) => `Menú de ${name}`, profile: 'Mi perfil', signOut: 'Salir' },
    profile: {
      characters: { man: 'Hombre', woman: 'Mujer' },
      noCharacter: 'elígelo al entrar al juego',
      character: (name) => `Personaje: ${name}`,
    },
  },
  en: {
    auth: {
      email: 'Email',
      password: 'Password',
      passwordWithMin: (min) => `Password (at least ${min} characters)`,
      name: 'Your name',
      signIn: 'Sign in',
      signUp: 'Create account',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      confirmEmail: 'Account created! Check your inbox and open the confirmation link. Then come back here to sign in.',
      errors: ({ nameMin, nameMax, passwordMin }) => ({
        'invalid-name': `Your name must be between ${nameMin} and ${nameMax} characters.`,
        'invalid-email': 'Check your email: it does not look valid.',
        'missing-password': 'Enter your password.',
        'weak-password': `The password must be at least ${passwordMin} characters.`,
        'invalid-credentials': 'Wrong email or password.',
        'email-not-confirmed': 'Confirm your email before signing in: check your inbox and your spam folder.',
        'user-exists': 'An account with that email already exists. Try signing in.',
        'rate-limited': 'Too many attempts. Wait a few minutes and try again.',
        unavailable: 'We could not reach the account service. Check your connection or try again later.',
        unknown: 'Something went wrong. Try again.',
      }),
    },
    modal: { title: (site) => `Sign in to ${site}`, close: 'Close' },
    menu: { label: (name) => `${name}'s menu`, profile: 'My profile', signOut: 'Sign out' },
    profile: {
      characters: { man: 'Man', woman: 'Woman' },
      noCharacter: 'choose one when you enter the game',
      character: (name) => `Character: ${name}`,
    },
  },
});
