import { describe, expect, it } from 'vitest';
import { staticGameCatalog } from './staticGameCatalog';

describe('staticGameCatalog', () => {
  it('keeps the Spanish copy of every game', async () => {
    const [cumulo, duel] = await staticGameCatalog('es').findAll();
    expect(cumulo).toMatchObject({ slug: 'cumulo-city', title: 'Cúmulo City', tagline: 'Recorre la ciudad como consultor cloud' });
    expect(duel).toMatchObject({ slug: 'service-duel', title: 'Duelo de servicios', tagline: 'Elige el servicio correcto antes de que acabe el tiempo' });
  });

  it('gives every game its English copy and the same structure as in Spanish', async () => {
    const [es, en] = await Promise.all([staticGameCatalog('es').findAll(), staticGameCatalog('en').findAll()]);
    expect(en.map((game) => game.title)).toEqual(['Cúmulo City', 'Service Duel']);
    expect(en[0].tagline).toBe('Explore the city as a cloud consultant');
    const structure = ({ slug, status, level, domains }: (typeof es)[number]) => ({ slug, status, level, domains });
    expect(en.map(structure)).toEqual(es.map(structure));
    for (const [index, game] of en.entries()) expect(game.description).not.toBe(es[index].description);
  });
});
