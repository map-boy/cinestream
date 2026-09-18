/** The catalogue views, each with its own URL so they can be linked and indexed. */
export type CatalogueTab = 'home' | 'movies' | 'tv' | 'trending' | 'mylist';

interface TabMeta {
  path: string;
  title: string;
  description: string;
  /** Shown on the page itself, and in the prerendered snapshot of it. */
  intro: string;
}

export const TAB_META: Record<CatalogueTab, TabMeta> = {
  home: {
    path: '/',
    title: 'CineStream - Discover Movies, TV Shows and Public Domain Films',
    description:
      'Browse trending titles, read reviews and cast details, and watch a curated library of public domain films in full.',
    intro: '',
  },
  movies: {
    path: '/movies',
    title: 'Movies Catalogue - CineStream',
    description:
      'Browse the CineStream film catalogue by genre, rating and release year, with synopses, cast lists and reviews for every title.',
    intro:
      'The full film catalogue, sorted by audience rating. Open any title for its synopsis, cast, reviews and trailer. Films marked "Full film" are public domain and play here in full; everything else is trailer and information only.',
  },
  tv: {
    path: '/tv-shows',
    title: 'TV Shows and Series - CineStream',
    description:
      'Browse television series on CineStream with premise summaries, cast details, season counts and audience ratings.',
    intro:
      'Television series, ranked by audience rating. Series carry a premise rather than a plot summary, and a single rating covers a run that may have changed a great deal between its first season and its last, so the reviews are usually worth more than the number.',
  },
  trending: {
    path: '/trending',
    title: 'Trending Now - CineStream',
    description:
      'What is rising on CineStream today, ranked by recent release buzz, rating momentum and a cap on how much one genre can dominate.',
    intro:
      'What is rising today. The ranking weighs recent release buzz, whether a rating is climbing or falling, and a cap on how much any single genre can take over the row, so it reshuffles daily rather than sitting still.',
  },
  mylist: {
    path: '/my-list',
    title: 'My List - CineStream',
    description: 'Titles you have saved on CineStream to watch later.',
    intro:
      'Titles you have saved to watch later. Nothing lands here automatically: My List records what you intend to watch, while Continue Watching on the home page records what you actually started.',
  },
};

const PATH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_META).map(([tab, meta]) => [meta.path, tab as CatalogueTab])
) as Record<string, CatalogueTab>;

export const CATALOGUE_PATHS = Object.values(TAB_META).map((m) => m.path);

export function tabForPath(pathname: string): CatalogueTab {
  return PATH_TO_TAB[pathname.replace(/\/+$/, '') || '/'] || 'home';
}

export function pathForTab(tab: string): string {
  return TAB_META[tab as CatalogueTab]?.path || '/';
}
