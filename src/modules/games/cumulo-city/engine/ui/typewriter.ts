/** Portion of `text` visible after `elapsedMs` when revealing `charsPerSecond` characters per second. */
export function revealedText(text: string, elapsedMs: number, charsPerSecond: number): string {
  return text.slice(0, Math.floor((elapsedMs / 1000) * charsPerSecond));
}
