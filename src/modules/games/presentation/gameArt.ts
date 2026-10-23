/** Preview images live in /public; games without art get a placeholder. */
const ART: Record<string, string> = {
  'cumulo-city': '/images/games/cumulo-city.png',
  'service-duel': '/images/games/service-duel.png',
};

export function gameArt(slug: string): string | undefined {
  return ART[slug];
}
