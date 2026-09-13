import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Compact header for the routes that render outside the catalogue shell (blog,
 * article and 404 pages), matching the header on the static HTML pages so
 * navigation is consistent everywhere on the site.
 */
export const PageHeader: React.FC = () => {
  const linkClass = 'text-zinc-400 hover:text-white transition-colors';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 px-4 md:px-12 py-3.5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          to="/"
          className="text-red-600 text-xl md:text-2xl font-black tracking-tighter hover:opacity-90 transition-opacity"
        >
          CINESTREAM
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <a href="/about.html" className={linkClass}>About</a>
          <a href="/contact.html" className={linkClass}>Contact</a>
          <a href="/faq.html" className={linkClass}>FAQ</a>
          <a href="/privacy.html" className={linkClass}>Privacy</a>
          <a href="/terms.html" className={linkClass}>Terms</a>
        </nav>
      </div>
    </header>
  );
};
