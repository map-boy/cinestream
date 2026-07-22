import React, { useState } from 'react';
import { X } from 'lucide-react';

const posts = [
  {
    slug: 'how-we-pick-trending',
    title: 'How We Pick What\'s Trending',
    body: `Our trending list isn't random. We weigh a mix of factors: recent release buzz, audience rating momentum, and genre balance so one category doesn't dominate. Every day we re-check ratings and swap out titles that have cooled off. We also make room for older, well-reviewed films that deserve a second look, not just the newest releases. The goal is a list that feels alive, not a static chart.`
  },
  {
    slug: 'guide-using-cinestream',
    title: 'A Quick Guide to Using CineStream',
    body: `Start on the homepage, where rows are organized by mood and genre rather than one long list. Tap any poster to open the detail view, where you'll find the storyline, a background summary, top cast, and real viewer reviews pulled in live. Use "Add to List" to bookmark anything you want to come back to later. Search works best with exact or partial titles. Related titles appear at the bottom of every detail page if you want to keep exploring similar films.`
  },
  {
    slug: 'why-ratings-matter',
    title: 'Why We Show Ratings the Way We Do',
    body: `A single number can hide a lot. That's why alongside the overall rating, we surface real written reviews so you can see the reasoning, not just the score. We pull from multiple review sources so no single opinion dominates the picture. If a film has very few reviews, we say so, since a rating built on five reviews means something different than one built on five thousand.`
  }
];

export const Blog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [active, setActive] = useState(posts[0].slug);
  const post = posts.find(p => p.slug === active)!;

  return (
    <div className="fixed inset-0 z-[80] bg-black/95 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12 text-white">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-zinc-800 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-black mb-8">CineStream Blog</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {posts.map(p => (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${active === p.slug ? 'bg-red-600' : 'bg-zinc-800'}`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-300 leading-relaxed">{post.body}</p>
      </div>
    </div>
  );
};
