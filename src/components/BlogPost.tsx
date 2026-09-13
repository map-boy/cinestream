import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { posts, getPost, readingTime } from '../data/blogPosts';
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

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12">
        <PageHeader />
        <Helmet>
          <title>Article not found - CineStream Blog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-4">Article not found</h1>
          <p className="text-zinc-400 mb-6">
            We could not find that article. It may have been renamed or removed.
          </p>
          <Link to="/blog" className="text-red-500 hover:underline">Browse all articles</Link>
        </div>
      </div>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const paragraphs = post.body.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12 pb-20">
      <PageHeader />
      <Helmet>
        <title>{`${post.title} - CineStream Blog`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            mainEntityOfPage: url,
            author: { '@type': 'Organization', name: 'CineStream' },
            publisher: { '@type': 'Organization', name: 'VAF Ubwenge Tech' },
          })}
        </script>
      </Helmet>

      <article className="max-w-3xl mx-auto">
        <nav className="text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{post.title}</span>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-500 mb-4">
            <span className="text-red-500 font-bold">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{readingTime(post)} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{post.title}</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">{post.description}</p>
        </header>

        <div className="space-y-5 text-zinc-300 leading-relaxed">
          {paragraphs.map((para, i) => (
            <React.Fragment key={i}>
              <p>{para}</p>
              {i === 3 && paragraphs.length > 7 && <AdSlot slot="4444444444" />}
            </React.Fragment>
          ))}
        </div>

        <AdSlot slot="5555555555" className="mt-10" />

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-zinc-800">
            <h2 className="text-lg font-bold mb-4">More on {post.category}</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/blog/${r.slug}`} className="text-zinc-300 hover:text-red-500 transition-colors">
                    {r.title}
                  </Link>
                  <p className="text-xs text-zinc-500 mt-1">{r.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10">
          <Link to="/blog" className="text-sm text-zinc-400 hover:text-white">&larr; All articles</Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
};
