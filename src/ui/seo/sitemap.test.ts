import { describe, expect, it } from 'vitest';
import { robotsTxt, sitemapXml } from './sitemap';

const site = new URL('https://cumulo.example');

describe('sitemapXml', () => {
  it('lists every public page with its absolute URL', () => {
    const xml = sitemapXml(site, ['/', '/theory', '/theory/cloud-practitioner/cloud-benefits']);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<loc>https://cumulo.example/</loc>');
    expect(xml).toContain('<loc>https://cumulo.example/theory/cloud-practitioner/cloud-benefits</loc>');
    expect(xml.match(/<url>/g)).toHaveLength(3);
  });
});

describe('robotsTxt', () => {
  it('allows crawling, keeps private pages out and points to the sitemap', () => {
    const txt = robotsTxt(site);
    expect(txt).toContain('User-agent: *');
    expect(txt).toContain('Disallow: /profile');
    expect(txt).toContain('Disallow: /sign-in');
    expect(txt).toContain('Sitemap: https://cumulo.example/sitemap.xml');
  });

  it('leaves the sitemap out when the site address is unknown', () => {
    expect(robotsTxt(undefined)).not.toContain('Sitemap:');
  });
});
