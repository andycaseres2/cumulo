import type { DialogContent } from './dialog';

/** Several dialog pages in a row; the last page may offer choices. */
export interface Conversation {
  pages: DialogContent[];
  /** Called with the picked choice id; the conversation has already ended. */
  onChoice?: (choiceId: string) => void;
  /** Called when the conversation ends without a choice. */
  onEnd?: () => void;
}

export function toConversation(content: DialogContent | Conversation): Conversation {
  return 'pages' in content ? content : { pages: [content] };
}

/** Where the player is inside a conversation. */
export class ConversationCursor {
  private index = 0;

  constructor(readonly conversation: Conversation) {}

  current(): DialogContent {
    return this.conversation.pages[this.index];
  }

  /** Moves to the next page; a page with choices blocks until one is picked. */
  advance(): 'next' | 'end' | 'blocked' {
    if (this.current().choices?.length) return 'blocked';
    if (this.index >= this.conversation.pages.length - 1) return 'end';
    this.index++;
    return 'next';
  }

  choose(choiceId: string): boolean {
    return this.current().choices?.some((c) => c.id === choiceId) ?? false;
  }
}
