import { describe, expect, it } from 'vitest';
import { ConversationCursor, toConversation } from './conversation';

const page = (text: string, choices?: { id: string; label: string }[]) => ({ title: 'Rosa', text, choices });

describe('ConversationCursor', () => {
  it('walks through the pages in order and ends after the last one', () => {
    const cursor = new ConversationCursor({ pages: [page('one'), page('two')] });

    expect(cursor.current().text).toBe('one');
    expect(cursor.advance()).toBe('next');
    expect(cursor.current().text).toBe('two');
    expect(cursor.advance()).toBe('end');
  });

  it('does not move past a page with choices until one is picked', () => {
    const cursor = new ConversationCursor({ pages: [page('offer', [{ id: 'yes', label: 'Sí' }])] });

    expect(cursor.advance()).toBe('blocked');
    expect(cursor.current().text).toBe('offer');
  });

  it('accepts only the choices of the current page', () => {
    const cursor = new ConversationCursor({ pages: [page('intro'), page('offer', [{ id: 'yes', label: 'Sí' }])] });

    expect(cursor.choose('yes')).toBe(false);
    cursor.advance();
    expect(cursor.choose('nope')).toBe(false);
    expect(cursor.choose('yes')).toBe(true);
  });

  it('wraps a single dialog into a one-page conversation', () => {
    expect(toConversation(page('hola')).pages).toHaveLength(1);
  });
});
