/** Pages search engines should not list: they are personal or only a sign-in form. */
const PRIVATE_PATHS = ['/profile', '/sign-in'];

const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function sitemapXml(site: URL, paths: string[]): string {
  const urls = paths.map((path) => `  <url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n');
}

/** Without the site address (SITE_URL) there is no absolute sitemap URL to point to. */
export function robotsTxt(site: URL | undefined): string {
  const lines = ['User-agent: *', 'Allow: /', ...PRIVATE_PATHS.map((path) => `Disallow: ${path}`)];
  if (site) lines.push('', `Sitemap: ${new URL('/sitemap.xml', site).href}`);
  return lines.join('\n') + '\n';
}
