/** Preview images live in /public; games without art get a placeholder. */
const ART: Record<string, string> = {
  'nimbus-city': '/images/games/nimbus-city.png',
};

export function gameArt(slug: string): string | undefined {
  return ART[slug];
}
