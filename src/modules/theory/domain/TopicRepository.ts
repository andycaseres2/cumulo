import type { Topic } from './Topic';

/** Port: where theory topics are stored. */
export interface TopicRepository {
  findAll(): Promise<Topic[]>;
}
