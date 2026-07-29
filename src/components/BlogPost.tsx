import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { posts } from '../data/blogPosts';
export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12">
        <p className="text-zinc-400">Post not found.</p>
        <Link to="/blog" className="text-red-500 hover:underline">Back to Blog</Link>
      </div>
    );
  }
  const description = post.body.slice(0, 155).trim() + '...';
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12 pb-20">
      <Helmet>
        <title>{post.title} - CineStream Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-zinc-400 hover:text-white mb-8 inline-block">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-black mb-6">{post.title}</h1>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{post.body}</p>
      </div>
    </div>
  );
};
