import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteFooter } from './SiteFooter';
import { PageHeader } from './PageHeader';

/**
 * Rendered for any URL that matches no route. Marked noindex so unknown paths
 * are not indexed as thin duplicates of the home page.
 */
export const NotFound: React.FC = () => (
  <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 md:px-12 flex flex-col">
    <PageHeader />
    <Helmet>
      <title>Page not found - CineStream</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <div className="max-w-3xl mx-auto flex-1">
      <p className="text-red-600 font-black text-6xl mb-4">404</p>
      <h1 className="text-3xl font-black mb-4">This page does not exist</h1>
      <p className="text-zinc-400 leading-relaxed mb-8">
        The address you followed is not a page on CineStream. It may have been mistyped, or it may
        point to something that has since moved. The links below cover everything on the site.
      </p>
      <ul className="space-y-2 text-sm">
        <li><Link to="/" className="text-red-500 hover:underline">Home and catalogue</Link></li>
        <li><Link to="/blog" className="text-red-500 hover:underline">Blog and guides</Link></li>
        <li><a href="/about.html" className="text-red-500 hover:underline">About CineStream</a></li>
        <li><a href="/contact.html" className="text-red-500 hover:underline">Contact us</a></li>
        <li><a href="/faq.html" className="text-red-500 hover:underline">Frequently asked questions</a></li>
      </ul>
    </div>

    <SiteFooter />
  </div>
);
