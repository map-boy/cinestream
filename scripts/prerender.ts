/**
 * Post-build step: writes a static HTML snapshot for every blog route and
 * regenerates the sitemap.
 *
 * The SPA is fine for people, but a crawler that does not execute JavaScript
 * sees an empty <div id="root">. Each snapshot carries the full article text
 * inside that div together with per-page title, description, canonical URL and
 * BlogPosting structured data. React's createRoot().render() replaces the
 * contents on hydration, so visitors still get the full application.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts, readingTime, type BlogPost } from '../src/data/blogPosts';
import { TAB_META, type CatalogueTab } from '../src/lib/catalogueTabs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://cinestream-1.vercel.app';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: TAB_META.movies.path, priority: '0.9', changefreq: 'daily' },
  { path: TAB_META.tv.path, priority: '0.9', changefreq: 'daily' },
  { path: TAB_META.trending.path, priority: '0.9', changefreq: 'daily' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/about.html', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact.html', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq.html', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy.html', priority: '0.4', changefreq: 'yearly' },
  { path: '/cookies.html', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms.html', priority: '0.4', changefreq: 'yearly' },
  { path: '/disclaimer.html', priority: '0.5', changefreq: 'yearly' },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Swaps the template's head metadata for this page's own. */
function withHead(
  template: string,
  opts: {
    title: string;
    description: string;
    canonical: string;
    jsonLd: object;
    extraMeta?: string;
  },
): string {
  // Remove the template's own metadata first, so the tags inserted below are
  // the only ones left. Doing this in the other order would strip the new tags.
  const stripped = template
    .replace(/\n\s*<meta name="description"[\s\S]*?\/>/, '')
    .replace(/\n\s*<link rel="canonical"[\s\S]*?\/>/, '')
    .replace(/\n\s*<meta property="og:title"[\s\S]*?\/>/, '')
    .replace(/\n\s*<meta property="og:description"[\s\S]*?\/>/, '')
    .replace(/\n\s*<meta property="og:type"[\s\S]*?\/>/, '')
    .replace(/\n\s*<meta property="og:url"[\s\S]*?\/>/, '')
    .replace(/\n\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

  const head = [
    `<title>${escapeHtml(opts.title)}</title>`,
    `<meta name="description" content="${escapeHtml(opts.description)}" />`,
    `<link rel="canonical" href="${opts.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(opts.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(opts.description)}" />`,
    `<meta property="og:url" content="${opts.canonical}" />`,
    opts.extraMeta || `<meta property="og:type" content="website" />`,
    `<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');

  return stripped.replace(/<title>[\s\S]*?<\/title>/, head);
}

function withBody(template: string, markup: string): string {
  return template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

function write(relative: string, html: string): void {
  const target = join(DIST, relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, 'utf-8');
}

/** Header and footer links, so the snapshot carries the same navigation. */
const HEADER_MARKUP = `<header>
  <a href="/">CineStream</a>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/about.html">About</a>
    <a href="/contact.html">Contact</a>
    <a href="/faq.html">FAQ</a>
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
  </nav>
</header>`;

const FOOTER_MARKUP = `<footer>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog and Guides</a>
    <a href="/about.html">About Us</a>
    <a href="/contact.html">Contact Us</a>
    <a href="/faq.html">FAQ</a>
    <a href="/privacy.html">Privacy Policy</a>
    <a href="/cookies.html">Cookie Policy</a>
    <a href="/terms.html">Terms of Service</a>
    <a href="/disclaimer.html">Disclaimer and DMCA</a>
  </nav>
  <p>&copy; 2026 CineStream, a project of VAF Ubwenge Tech, Kigali, Rwanda. CineStream does not host or distribute copyrighted films.</p>
  <p>Movie and TV metadata provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
</footer>`;

function articleMarkup(post: BlogPost): string {
  const paragraphs = post.body
    .split('\n\n')
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n');

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`)
    .join('\n');

  return `${HEADER_MARKUP}
<article>
  <nav><a href="/">Home</a> / <a href="/blog">Blog</a> / ${escapeHtml(post.title)}</nav>
  <p>${escapeHtml(post.category)} &middot; <time datetime="${post.date}">${formatDate(post.date)}</time> &middot; ${readingTime(post)} min read</p>
  <h1>${escapeHtml(post.title)}</h1>
  <p>${escapeHtml(post.description)}</p>
  ${paragraphs}
  ${related ? `<h2>More on ${escapeHtml(post.category)}</h2><ul>${related}</ul>` : ''}
  <p><a href="/blog">All articles</a></p>
</article>
${FOOTER_MARKUP}`;
}

function indexMarkup(): string {
  const items = posts
    .map(
      (p) => `  <li>
    <h2><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h2>
    <p>${escapeHtml(p.category)} &middot; <time datetime="${p.date}">${formatDate(p.date)}</time></p>
    <p>${escapeHtml(p.description)}</p>
  </li>`,
    )
    .join('\n');

  return `${HEADER_MARKUP}
<main>
  <nav><a href="/">Home</a> / Blog</nav>
  <h1>CineStream Blog</h1>
  <p>Written guides and articles on public domain cinema, film craft, and how CineStream works.</p>
  <ul>
${items}
  </ul>
</main>
${FOOTER_MARKUP}`;
}

/**
 * Home page snapshot. The catalogue needs JavaScript and a live TMDB response,
 * so without this the entry point of the whole site is an empty <div>. The
 * markup is the same content a visitor sees below the carousels (intro text and
 * the latest articles), styled inline so the pre-hydration paint is not jarring;
 * React replaces it as soon as it mounts. Nothing here is hidden from visitors.
 */
function homeMarkup(): string {
  const latest = posts
    .slice(0, 4)
    .map(
      (p) => `    <li style="margin-bottom:14px">
      <a href="/blog/${p.slug}" style="color:#fff;font-weight:700;text-decoration:none">${escapeHtml(p.title)}</a>
      <div style="color:#a1a1aa;font-size:14px;margin-top:4px">${escapeHtml(p.description)}</div>
    </li>`,
    )
    .join('\n');

  return `<div style="background:#0a0a0a;color:#d4d4d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;line-height:1.7">
${HEADER_MARKUP}
<main style="max-width:820px;margin:0 auto;padding:32px 20px 64px">
  <h1 style="color:#fff;font-size:32px;letter-spacing:-0.02em;margin:0 0 12px">CineStream</h1>
  <p style="font-size:18px;color:#a1a1aa;margin:0 0 20px">Discover films and television, and watch a curated library of public domain cinema in full.</p>
  <p>CineStream is a film and television discovery platform built by VAF Ubwenge Tech in Kigali, Rwanda. Every title carries a full synopsis, cast and crew credits, a rating shown alongside its vote count, and written reviews, so you can judge whether something is worth your evening before you start it rather than afterwards.</p>
  <p>Alongside that catalogue we maintain a library of public domain films you can watch here in full: silent-era classics, mid-century film noir, early science fiction, and archival documentaries whose copyright has expired or was never renewed. Those are the only titles on which we offer complete playback. For films still under copyright we show information and an official trailer only. CineStream does not host, mirror or distribute copyrighted films, and does not link to sites that do.</p>
  <h2 style="color:#fff;font-size:21px;margin:32px 0 12px">From the CineStream Blog</h2>
  <ul style="list-style:none;padding:0">
${latest}
  </ul>
  <p><a href="/blog" style="color:#ef4444">Read all ${posts.length} articles</a> &middot; <a href="/faq.html" style="color:#ef4444">FAQ</a> &middot; <a href="/disclaimer.html" style="color:#ef4444">Where our video comes from</a></p>
</main>
${FOOTER_MARKUP}
</div>`;
}

/**
 * Snapshot for a catalogue route. The grid itself needs TMDB, so the snapshot
 * carries the same heading and intro paragraph the React view renders above it,
 * plus site navigation. Visitors see identical text once React mounts.
 */
function catalogueMarkup(tab: Exclude<CatalogueTab, 'home' | 'mylist'>, heading: string): string {
  return `<div style="background:#0a0a0a;color:#d4d4d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;line-height:1.7">
${HEADER_MARKUP}
<main style="max-width:820px;margin:0 auto;padding:32px 20px 64px">
  <h1 style="color:#fff;font-size:32px;letter-spacing:-0.02em;margin:0 0 12px">${escapeHtml(heading)}</h1>
  <p>${escapeHtml(TAB_META[tab].intro)}</p>
  <p><a href="/blog" style="color:#ef4444">Guides and articles</a> &middot; <a href="/faq.html" style="color:#ef4444">FAQ</a> &middot; <a href="/disclaimer.html" style="color:#ef4444">Where our video comes from</a></p>
</main>
${FOOTER_MARKUP}
</div>`;
}

function sitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    ...STATIC_PAGES.map((page) => ({
      loc: `${SITE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
}

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const blogIndexHtml = withBody(
  withHead(template, {
    title: 'Blog and Guides - CineStream',
    description:
      'Guides and articles from CineStream on public domain cinema, film craft, how to use the site, and where our catalogue data and video actually come from.',
    canonical: `${SITE_URL}/blog`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'CineStream Blog',
      url: `${SITE_URL}/blog`,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    },
  }),
  indexMarkup(),
);

// Emitted at both paths: hosts resolve an extensionless URL from either
// "<path>.html" or "<path>/index.html" depending on configuration.
write('blog/index.html', blogIndexHtml);
write('blog.html', blogIndexHtml);

for (const post of posts) {
  const html = withBody(
    withHead(template, {
      title: `${post.title} - CineStream Blog`,
      description: post.description,
      canonical: `${SITE_URL}/blog/${post.slug}`,
      extraMeta: `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="${post.date}" />`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        author: { '@type': 'Organization', name: 'CineStream' },
        publisher: { '@type': 'Organization', name: 'VAF Ubwenge Tech' },
      },
    }),
    articleMarkup(post),
  );

  write(`blog/${post.slug}/index.html`, html);
  write(`blog/${post.slug}.html`, html);
}

const xml = sitemap();
writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf-8');

console.log(`Prerendered ${posts.length + 1} blog pages and wrote sitemap.xml`);

// Written last: dist/index.html is the template every snapshot above is built
// from, so it must stay untouched until they are all emitted.
write(
  'index.html',
  withBody(
    withHead(template, {
      title: 'CineStream - Discover Movies, TV Shows and Public Domain Films',
      description:
        'CineStream is a movie and TV discovery platform: browse trending titles, read reviews and cast details, and watch a curated library of public domain films in full.',
      canonical: `${SITE_URL}/`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CineStream',
        url: `${SITE_URL}/`,
        description:
          'A movie and TV discovery platform with reviews, cast details and a library of public domain films.',
        publisher: { '@type': 'Organization', name: 'VAF Ubwenge Tech' },
      },
    }),
    homeMarkup(),
  ),
);

console.log('Prerendered the home page');

for (const [tab, heading] of [
  ['movies', 'Movies Catalogue'],
  ['tv', 'TV Shows and Series'],
  ['trending', 'Trending Today'],
] as const) {
  const meta = TAB_META[tab];
  const html = withBody(
    withHead(template, {
      title: meta.title,
      description: meta.description,
      canonical: `${SITE_URL}${meta.path}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta.title,
        description: meta.description,
        url: `${SITE_URL}${meta.path}`,
      },
    }),
    catalogueMarkup(tab, heading),
  );

  write(`${meta.path.replace(/^\//, '')}.html`, html);
  write(`${meta.path.replace(/^\//, '')}/index.html`, html);
}

console.log('Prerendered the catalogue routes');
