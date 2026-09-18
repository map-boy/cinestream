import React from 'react';
import { Link } from 'react-router-dom';
import { TAB_META } from '../lib/catalogueTabs';

const CATALOGUE_LINKS = [
  { path: TAB_META.home.path, label: 'Home' },
  { path: TAB_META.movies.path, label: 'Movies Catalogue' },
  { path: TAB_META.tv.path, label: 'TV Shows' },
  { path: TAB_META.trending.path, label: 'Trending Now' },
  { path: TAB_META.mylist.path, label: 'My List' },
];

export const SiteFooter: React.FC = () => {
  const linkClass = 'text-left text-xs hover:text-white transition-colors';

  return (
    <footer className="border-t border-zinc-900 py-12 px-4 md:px-12 text-zinc-500 text-sm bg-zinc-950">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">CineStream</h4>
          <p className="text-xs leading-relaxed text-zinc-400">
            Browse movies and TV shows, read reviews and cast details, and stream our library of
            public domain films. CineStream does not host or distribute copyrighted films.
          </p>
          <p className="text-xs text-zinc-500">
            A project of VAF Ubwenge Tech, Kigali, Rwanda.
          </p>
        </div>

        <nav className="space-y-2 flex flex-col" aria-label="Catalogue">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Browse</h4>
          {CATALOGUE_LINKS.map((item) => (
            <Link key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <Link to="/blog" className={linkClass}>Blog and Guides</Link>
        </nav>

        <nav className="space-y-2 flex flex-col" aria-label="Company">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Company</h4>
          <a href="/about.html" className={linkClass}>About Us</a>
          <a href="/contact.html" className={linkClass}>Contact Us</a>
          <a href="/faq.html" className={linkClass}>FAQ</a>
        </nav>

        <nav className="space-y-2 flex flex-col" aria-label="Legal">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Legal</h4>
          <a href="/privacy.html" className={linkClass}>Privacy Policy</a>
          <a href="/terms.html" className={linkClass}>Terms of Service</a>
          <a href="/cookies.html" className={linkClass}>Cookie Policy</a>
          <a href="/disclaimer.html" className={linkClass}>Disclaimer and DMCA</a>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-900/60 text-xs">
        <p>&copy; {new Date().getFullYear()} CineStream, a project of VAF Ubwenge Tech. All rights reserved.</p>
        <p className="text-zinc-600">
          Movie and TV metadata provided by TMDB. This product uses the TMDB API but is not endorsed
          or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};
