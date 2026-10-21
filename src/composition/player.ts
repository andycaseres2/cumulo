/**
 * Composition root for the player module. Safe to import from client-side scripts.
 * Swap `guestPlayerSession` for an auth-backed adapter to enable real sign-in.
 */
import { getCurrentPlayer } from '@/modules/player/application/getCurrentPlayer';
import { guestPlayerSession } from '@/modules/player/infrastructure/guestPlayerSession';

export const currentPlayer = () => getCurrentPlayer(guestPlayerSession);
