import React from 'react';
import { Link } from 'react-router-dom';
import { posts, readingTime } from '../data/blogPosts';

/**
 * Surfaces the site's own writing on the home page. The catalogue itself is
 * third-party metadata; the articles are the original content, and burying
 * them behind a nav link makes the landing page look like a thin data wrapper.
 */
export const LatestArticles: React.FC<{ count?: number }> = ({ count = 4 }) => {
  const latest = posts.slice(0, count);

  return (
    <section className="px-4 md:px-12 mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <h2 className="text-2xl font-black text-white tracking-tight">From the CineStream Blog</h2>
        <Link to="/blog" className="text-sm text-red-500 hover:underline">
          All {posts.length} articles
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {latest.map((post) => (
          <article key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="block h-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-red-600 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                <span className="text-red-500 font-bold">{post.category}</span>
                <span>{readingTime(post)} min read</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{post.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
