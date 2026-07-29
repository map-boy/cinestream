import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { posts } from '../data/blogPosts';
export const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12 pb-20">
      <Helmet>
        <title>Blog - CineStream</title>
        <meta name="description" content="Tips, guides, and notes from the CineStream team on how the platform works, how we pick trending titles, and where our content comes from." />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8">CineStream Blog</h1>
        <div className="space-y-6">
          {posts.map(p => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="block bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.body.slice(0, 160)}...</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
