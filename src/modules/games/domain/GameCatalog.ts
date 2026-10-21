import type { Game } from './Game';

/** Port: the list of games the platform offers. */
export interface GameCatalog {
  findAll(): Promise<Game[]>;
}
