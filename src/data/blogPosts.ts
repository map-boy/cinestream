import { libraryPosts } from './blogPostsLibrary';

export interface BlogPost {
  slug: string;
  title: string;
  /** Short summary used for meta descriptions and blog index cards. */
  description: string;
  /** ISO date (YYYY-MM-DD) used for sorting and article structured data. */
  date: string;
  /** Topic label shown on the index; also groups related reading. */
  category: string;
  body: string;
}

const sitePosts: BlogPost[] = [
  {
    slug: 'how-we-pick-trending',
    title: "How We Pick What's Trending",
    description: 'How the CineStream trending row is ranked: recent release buzz, rating momentum, and a genre balance cap that stops one category taking over.',
    date: '2026-07-24',
    category: 'Behind the Scenes',
    body: `Our trending list isn't random, and it isn't just "whatever is popular this week" copied from a single external chart. We weigh a mix of signals every day: how much recent release buzz a title has, whether its audience rating is climbing or falling, and how well the overall list balances across genres so one category doesn't quietly take over the whole row.

Recent buzz matters most in the first few days after a release, since that's when word of mouth is loudest and most people are deciding whether something is worth their time. But buzz fades fast, so we don't let it dominate the ranking forever. A film that opened big but is getting lukewarm reviews a week later will start sliding down the list, even if it was the top result a few days earlier.

Rating momentum is the second factor, and it's deliberately different from a raw average score. A title with a 7.8 average that's been climbing steadily as more people watch it behaves differently in our system than a title stuck at 7.8 for months. The direction of movement tells us something an average alone can't: whether interest is building or has already peaked.

Genre balance is the part people notice least but would miss immediately if it disappeared. Without it, action and superhero titles would crowd out everything else almost every week, simply because they tend to generate the most raw engagement. We cap how much any single genre can dominate the trending row so drama, comedy, and international titles still get a fair shot at visibility.

We also intentionally leave room for older, well-reviewed films that deserve a second look rather than only surfacing what came out this month. Sometimes a five-year-old film gets rediscovered after a related sequel announcement, or simply because enough people started talking about it again. When that happens, our system picks it back up the same way it would a new release.

The result is a list that reshuffles daily but isn't chaotic — it's meant to feel alive rather than like a static, stale chart that never changes. If you check back every few days, you'll usually see a mix of familiar favorites holding steady and a few new names working their way in.`
  },
  {
    slug: 'guide-using-cinestream',
    title: 'A Quick Guide to Using CineStream',
    description: 'A practical walkthrough of the CineStream homepage, detail pages, search filters, My List, and Continue Watching.',
    date: '2026-07-25',
    category: 'Guides',
    body: `If you're new to CineStream, here's a practical walkthrough of how the site is laid out and how to get the most out of it without hunting around.

Start on the homepage, where content is organized by mood and genre rather than dumped into one long undifferentiated list. You'll see rows like Trending Now, Popular Movies, Latest Releases, and genre-specific rows such as Action Thrillers and Powerful Dramas. Scrolling horizontally within a row lets you browse that category without losing your place on the page.

Tapping any poster opens the detail view, which is where most of the useful information lives. You'll find the storyline summary, a cast list, and — importantly — real written reviews pulled in from trusted sources rather than just a single aggregate number. Reading a couple of these reviews before committing to a two-hour watch is usually more informative than a star rating alone, since it tells you why people liked or disliked something, not just how much.

If you find something you're not ready to watch yet, use the "Add to List" button on the detail page to bookmark it. Everything you save shows up under My List, which you can find in the navigation bar. This list is tied to your account, so it follows you across devices as long as you're signed in with the same account.

Search works best with exact or partial titles rather than vague descriptions — typing part of a movie's name will usually surface it faster than describing the plot. If you're not sure exactly what you're looking for, the filter panel next to search is worth exploring. It lets you narrow results by genre, minimum rating, and release year range simultaneously, which is especially useful if you know roughly what you're in the mood for but not a specific title.

Once you start watching something, CineStream automatically tracks your progress in the background. If you close the player partway through, that title will reappear in the Continue Watching row the next time you visit, picked up right where you left off. This only works while signed in, since progress is stored against your account rather than your browser.

Related titles appear at the bottom of every detail page, which is a good way to keep exploring once you've found something you like — they're chosen based on genre and thematic similarity rather than just being random suggestions.`
  },
  {
    slug: 'why-ratings-matter',
    title: 'Why We Show Ratings the Way We Do',
    description: 'Why we show written reviews and sample size alongside the score, instead of presenting a single average as the whole story.',
    date: '2026-07-26',
    category: 'Behind the Scenes',
    body: `A single number can hide a lot, and that's the main reason we've never been comfortable showing just a star rating and calling it a day. Two films can both sit at 7.5 out of 10 and mean completely different things — one might be consistently good but unremarkable, while the other might be polarizing, loved intensely by half its audience and disliked by the rest. The average looks the same either way, but the experience of watching them is not.

That's why, alongside the overall score, we surface real written reviews so you can see the reasoning behind the number rather than just the number itself. Reading even two or three reviews usually tells you more than staring at a rating for a minute, because you start to notice patterns — maybe reviewers keep mentioning a slow first act, or praising a particular performance, or warning about pacing issues in the back half. That kind of detail is exactly what a single aggregate score can't communicate.

We also deliberately pull reviews from multiple sources rather than relying on one platform's community. Review cultures differ a lot from site to site — some skew toward harsher critique, others toward enthusiastic fan reactions — and leaning on just one source risks giving you a skewed picture. Blending sources smooths that out somewhat, though we're upfront that no system is perfectly neutral.

Sample size is another thing we try to be transparent about. A rating built on five reviews means something very different from one built on five thousand, even if the numeric average happens to be identical. A tiny sample can be swung wildly by a couple of very positive or very negative reviewers, while a large sample tends to settle into something more representative of general opinion. When a title only has a handful of reviews, we flag that directly rather than presenting the number with false confidence.

None of this is meant to replace your own judgment — it's meant to give you enough context to make a decision that fits what you're actually in the mood for on a given night. Sometimes a divisive, flawed film is exactly what someone wants; other times, a safe, consistently well-reviewed pick is the better choice. Showing the reasoning behind the number, not just the number, is what lets you tell the difference.`
  },
  {
    slug: 'public-domain-films-worth-watching',
    title: 'The Public Domain Library Hiding in Plain Sight',
    description: 'What is actually in our public domain library: silent classics, mid-century noir, early science fiction, and archival documentaries.',
    date: '2026-07-27',
    category: 'Public Domain',
    body: `Every title on CineStream marked as fully playable comes from a growing library of public domain films — movies whose copyright has expired, was never renewed, or was otherwise released into the public domain by the rights holder. A lot of people hear "public domain" and immediately picture only grainy black-and-white shorts from the very early days of cinema, but the reality is a lot wider and more interesting than that.

Silent-era classics make up a meaningful chunk of the catalog, and many of them hold up remarkably well once you adjust to the format — visual storytelling was pushed to do a lot of heavy lifting when dialogue wasn't an option, and some of the camera work and staging from that era still feels inventive today. Mid-century film noir is another surprisingly large category; a number of B-movie thrillers and crime dramas from the 1940s and 50s fell into the public domain due to studios failing to renew copyright registrations, a fairly common clerical oversight at the time.

Early science fiction is a genre that benefits a lot from this too. Some genuinely influential sci-fi concepts first appeared on screen decades before the effects technology existed to do them justice, and watching the earlier, scrappier versions is its own kind of interesting, even if the special effects look dated by modern standards. Government-produced documentaries and educational shorts round things out — a lot of material commissioned by public agencies decades ago was never copyrighted in the first place, since it was produced as government work.

We check each title against a public archive database before marking it fully playable on CineStream, which is why not everything in our catalog is streamable directly through the site. For titles that are still under active copyright, we still show you the full detail page — synopsis, cast, ratings, and reviews — but we don't attempt to stream the film itself, since doing so without proper licensing would be both illegal and something we're simply not willing to do.

If a public domain match doesn't exist yet for a given title, we say so rather than quietly hiding the limitation. We think that kind of transparency matters more in this space than in most — streaming sites have a well-earned reputation for cutting corners on where their video actually comes from, and we'd rather be upfront about the boundary than pretend it doesn't exist.`
  },
  {
    slug: 'how-recommendations-work',
    title: 'How Our Genre Rows Actually Get Built',
    description: 'Genre rows are rebuilt continuously from rating thresholds and recency rather than hand-picked once and left alone.',
    date: '2026-07-28',
    category: 'Behind the Scenes',
    body: `The genre rows on your homepage aren't hand-picked once by someone on our team and then left alone for months — they're built dynamically from a live catalog and refreshed continuously based on a mix of rating thresholds and recency, which means the specific titles you see in, say, the Action row today may not be the same ones you'd see in it a month from now.

Here's roughly how it works under the hood. Every title in the catalog carries genre tags, a rating, and a release or add date. For a title to qualify for a genre row, it needs to clear a minimum rating threshold — this keeps weak, poorly-reviewed titles from cluttering a row just because they technically belong to that genre. Titles that clear the threshold are then weighted partly by recency, so newer additions get a bit of a visibility boost relative to older catalog entries, but older titles don't get pushed out entirely — a well-reviewed film from several years ago can still hold its position if it continues to perform well.

Drama and Action get their own dedicated homepage rows specifically because those are the two genres people browse most on the platform, based on how rows get interacted with. That doesn't mean other genres are ignored — the same underlying system runs for every genre we track, including comedy, thriller, sci-fi, and documentary — it just means Drama and Action get prime real estate on the homepage itself, while other genres are more easily discovered through the Movies and TV Shows catalog pages or through search filters.

If you don't see a favorite title pop up in its genre row right away, it's often not because the film isn't in the system — it's usually because the algorithm is currently weighing recent activity more heavily than older popularity for that particular slot. Rows aren't static snapshots; they shift as new titles are added and as engagement patterns change over time.

We also intentionally avoid making genre rows purely a popularity contest, since that tends to produce the same handful of blockbuster titles at the top of every row regardless of genre. Folding in a recency and rating-threshold system, rather than pure view counts, is our attempt to keep the catalog feeling like it has some depth to it instead of just surfacing the same five most-clicked titles everywhere.`
  },
  {
    slug: 'building-continue-watching',
    title: 'Why Continue Watching Remembers More Than You Think',
    description: 'How watch progress is stored, why the row is capped at twenty titles, and why it is tied to your account rather than your device.',
    date: '2026-07-29',
    category: 'Behind the Scenes',
    body: `When you're signed in, CineStream keeps a running history of what you've watched and exactly where you left off, down to a fairly precise timestamp rather than just a rough "started" or "finished" flag. That level of detail is what powers the Continue Watching row on your homepage, which is sorted by most recently watched first and capped at your last twenty titles so it doesn't get cluttered with things you watched months ago and have no intention of returning to.

The reason we cap it at twenty rather than showing your entire watch history is mostly about usefulness. A Continue Watching row with two hundred entries stops being a quick way to pick up where you left off and starts being just another long list to scroll through — which defeats the point. Twenty recent entries tends to strike a reasonable balance between covering things you might genuinely come back to and staying short enough to scan at a glance.

Progress tracking updates in the background as you watch, not just when you close the player. That means if your session gets interrupted unexpectedly — a dropped connection, a closed tab, a phone that died — your progress up to that point is generally still saved, rather than being lost entirely and forcing you to restart from the beginning next time.

Sign out, and that row disappears completely from the homepage. That's intentional: your watch history is tied to your account rather than your device or browser, which is what makes it possible to start watching something on a laptop, close it, and pick it back up later from a phone with the timestamp intact. If history were tied to the device instead, none of that cross-device continuity would work, and you'd effectively lose your place every time you switched screens.

It's also worth noting that Continue Watching only tracks titles you've actually started — simply browsing a detail page or adding something to My List doesn't add it here. The distinction matters, since My List is about intent (things you plan to watch) while Continue Watching is about actual viewing behavior. The two lists serve different purposes and are kept deliberately separate in how the system stores them.`
  },
  {
    slug: 'my-list-vs-history',
    title: "My List vs. History: What's the Difference?",
    description: 'My List records intent and History records behaviour. Here is how the two features differ and why they are kept separate.',
    date: '2026-07-30',
    category: 'Guides',
    body: `It's easy to mix these two features up at first glance, since they both surface titles related to your account, but they're built around fundamentally different kinds of intent and work quite differently under the hood.

My List is entirely intentional. Nothing lands there unless you manually tap "Add to List" on a title's detail page — it's a shelf you're actively curating, not something that fills up automatically as you browse. Because it's manual, My List tends to reflect what you're planning to watch rather than what you've already seen. A title can sit in My List for weeks or months without you ever having pressed play on it, and that's completely normal — it's meant to function as a saved-for-later queue, not a record of activity.

History, on the other hand, is entirely automatic and tracks actual behavior rather than intent. Every title you open and begin watching gets logged in the background, whether or not you meant to keep a record of it. This is also what powers the Continue Watching row, since that row is really just a filtered, timestamp-sorted view of your recent history. You don't need to do anything deliberate for a title to show up in History — simply pressing play is enough.

A useful way to think about the distinction: My List is a shelf you're curating, and History is closer to a diary of what you've actually watched, kept automatically whether you think about it or not. One reflects what you want to do; the other reflects what you did.

Both lists are private to your account and are never shown to other users, even if your account happens to be visible to others in some other context. There's no social or public-facing element to either feature currently — no shared watchlists, no visible activity feed, nothing like that. They exist purely as personal tools to help you keep track of what you're interested in and what you've already seen, and we don't currently have plans to make either of them shareable, since that would mean handling privacy considerations that go well beyond how the features are used today.

If you ever want to remove something from My List, you can do so from the same detail page where you added it, or from the My List tab itself. History isn't user-editable in the same way, since it's meant to be a passive record rather than something you curate.`
  },
  {
    slug: 'search-filters-explained',
    title: 'Getting the Most Out of Search Filters',
    description: 'Genre, minimum rating, and year range stack together rather than overriding each other. How to use that for real discovery.',
    date: '2026-07-31',
    category: 'Guides',
    body: `Typing a title directly into search is the fastest path when you already know what you're looking for, but the filter panel sitting next to it does considerably more work than most people realize, especially if you're browsing without a specific title in mind.

The filter panel lets you stack genre, minimum rating, and release year range together, and — importantly — the results update against all of those criteria simultaneously rather than just applying whichever filter you touched most recently. That distinction matters more than it sounds. A lot of filter systems on other sites apply filters one at a time in a way that effectively resets earlier choices; ours combines them, so setting a genre and a minimum rating and a year range all at once actually narrows results down to the intersection of all three, not just the last one you adjusted.

Sorting by rating is particularly useful if you're trying to surface hidden gems — titles that are genuinely well-reviewed but don't have a big marketing budget behind them and therefore never show up prominently in the main trending or popular rows. Because those rows are partly influenced by recency and engagement volume, a quietly excellent older film can get buried unless you go looking for it directly through a rating-sorted filter.

Sorting by year, on the other hand, is the fastest way to browse a specific decade if you're in a particular mood — say, wanting something from the 90s specifically, or curious what a certain era of filmmaking looked like. Combined with a genre filter, this becomes a genuinely useful discovery tool rather than just a sorting convenience — for example, filtering to Drama titles from the 1970s onward with a minimum rating gives you a fairly curated shortlist without much manual digging.

Clearing filters resets everything back to the unfiltered catalog in a single tap rather than requiring you to individually undo each selection, which matters if you've stacked several filters and just want to start over rather than fiddle with each one separately.

One thing worth knowing: filters apply to the currently active tab, so a filter set while browsing Movies won't carry over if you switch to the TV Shows tab. This is deliberate, since genre distributions and typical rating ranges can differ meaningfully between movies and TV shows, and carrying filters across tabs would produce confusing results more often than useful ones.`
  },
  {
    slug: 'about-our-video-sources',
    title: 'A Note on Where Our Video Comes From',
    description: 'Where every video on CineStream comes from: YouTube for trailers, a verified public domain archive for full films, and nothing else.',
    date: '2026-08-01',
    category: 'Policy',
    body: `Transparency matters to us here more than in most areas of the site, mostly because streaming platforms in general have earned a fairly poor reputation for being vague or dishonest about where their video content actually comes from. So here's the straightforward version, without hedging.

Trailers across CineStream are served directly through YouTube's official embed player. We don't host trailer files ourselves or route them through any third-party mirror — when you watch a trailer on a detail page, you're watching it through YouTube's own infrastructure, embedded on our page but playing directly from their servers under their standard embed terms.

For full-length titles marked as fully playable, playback is limited strictly to content sourced from a verified public domain archive. We check each candidate title against that archive before ever marking it playable, and if a public domain match doesn't exist for a given film, we simply don't offer playback for it — we don't fall back to unlicensed third-party embed sources to fill the gap, which is a shortcut a lot of similar-looking sites quietly take.

We want to be explicit about what this means in practice: we don't host pirated copies of copyrighted films anywhere on CineStream, and we don't link out to third-party sites that do either. This isn't a legal disclaimer added after the fact — it's a constraint that shaped how the video source system was actually built from the start. Titles still under active copyright are fully present on the site for browsing purposes — you can read the synopsis, see the cast, check ratings, and read reviews — but playback for those titles is simply not available through CineStream. If you want to watch one of those, you'd need to find it through a properly licensed service elsewhere, and we think that's the honest answer rather than pretending we have a workaround.

We know this means our fully-playable catalog is smaller than sites that don't observe this boundary. That's a tradeoff we've made deliberately rather than by accident, and it's one we'd rather be upfront about than have someone discover the hard way.`
  }
];

export const posts: BlogPost[] = [...sitePosts, ...libraryPosts].sort(
  (a, b) => b.date.localeCompare(a.date)
);

export function getPost(slug: string | undefined): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Rough reading time in minutes, used on the blog index and article header. */
export function readingTime(post: BlogPost): number {
  return Math.max(1, Math.round(post.body.split(/\s+/).length / 220));
}
