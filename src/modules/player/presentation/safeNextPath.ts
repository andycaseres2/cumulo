/**
 * Where to go after signing in. Only same-site paths are allowed ("/..." but not "//host" or "/\host"),
 * so a crafted ?next= link cannot send players to another website (open redirect).
 */
export function safeNextPath(next: string | null): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return '/';
  return next;
}
