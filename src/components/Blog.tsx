import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { posts, readingTime } from '../data/blogPosts';
import { AdSlot } from './AdSlot';
import { SiteFooter } from './SiteFooter';
import { PageHeader } from './PageHeader';

const SITE_URL = 'https://cinestream-1.vercel.app';

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const Blog: React.FC = () => {
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12 pb-20">
      <PageHeader />
      <Helmet>
        <title>Blog and Guides - CineStream</title>
        <meta
          name="description"
          content="Guides and articles from CineStream on public domain cinema, film craft, how to use the site, and where our catalogue data and video actually come from."
        />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Blog and Guides - CineStream" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'CineStream Blog',
            url: `${SITE_URL}/blog`,
            description:
              'Guides and articles on public domain cinema, film craft, and how CineStream works.',
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              url: `${SITE_URL}/blog/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <nav className="text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Blog</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl font-black mb-4 tracking-tight">CineStream Blog</h1>
          <p className="text-zinc-400 leading-relaxed">
            Written guides and longer articles on public domain cinema, how films from earlier eras
            were actually made, and how this site is put together. {posts.length} articles and
            counting, all written by the CineStream team at VAF Ubwenge Tech.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((c) => (
              <span
                key={c}
                className="text-[11px] uppercase tracking-wider text-zinc-400 border border-zinc-800 rounded-full px-3 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-5">
          {posts.map((p, i) => (
            <React.Fragment key={p.slug}>
              <article>
                <Link
                  to={`/blog/${p.slug}`}
                  className="block bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-500 mb-3">
                    <span className="text-red-500 font-bold">{p.category}</span>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span>{readingTime(p)} min read</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.description}</p>
                </Link>
              </article>
              {i === 4 && <AdSlot placement="blog-index" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};
