import { MIN_PASSWORD_LENGTH, NAME_LENGTH } from '../application/authenticate';
import type { AuthErrorKind } from '../domain/PlayerAuth';

export const AUTH_MESSAGES: Record<AuthErrorKind, string> = {
  'invalid-name': `Tu nombre debe tener entre ${NAME_LENGTH.min} y ${NAME_LENGTH.max} caracteres.`,
  'invalid-email': 'Revisa tu email: no parece válido.',
  'missing-password': 'Escribe tu contraseña.',
  'weak-password': `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
  'invalid-credentials': 'Email o contraseña incorrectos.',
  'email-not-confirmed': 'Confirma tu email antes de ingresar: revisa tu bandeja de entrada y la de spam.',
  'user-exists': 'Ya existe una cuenta con ese email. Prueba ingresar.',
  'rate-limited': 'Demasiados intentos. Espera unos minutos y vuelve a probar.',
  unavailable: 'No pudimos conectar con el servicio de cuentas. Revisa tu conexión o intenta más tarde.',
  unknown: 'Algo salió mal. Intenta de nuevo.',
};

export const CONFIRM_EMAIL_MESSAGE =
  '¡Cuenta creada! Revisa tu correo y abre el enlace de confirmación. Después vuelve aquí para ingresar.';
