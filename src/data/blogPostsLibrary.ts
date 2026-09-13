import type { BlogPost } from './blogPosts';

/**
 * Longer-form editorial articles about film, the public domain, and how to
 * get more out of a catalogue. Kept in a separate module from the
 * product-focused posts purely to keep each file a manageable size.
 */
export const libraryPosts: BlogPost[] = [
  {
    slug: 'what-public-domain-means',
    title: 'What "Public Domain" Actually Means for a Film',
    description: 'Copyright expiry, missed renewals, and omitted notices: the three routes by which a film ends up free for anyone to watch, copy and share.',
    date: '2026-09-12',
    category: 'Public Domain',
    body: `The phrase "public domain" gets used loosely enough that a lot of people assume it just means "old" or "free to find somewhere online." Neither is quite right, and the difference matters a great deal to anyone running a site that streams films legally. A work in the public domain is one that no longer carries copyright protection at all. Nobody owns the exclusive right to copy it, distribute it, screen it, or build something new on top of it. That is a legal status, not a description of quality or age, and a film either has it or it does not.

There are three main routes by which a film arrives in that state, and they behave quite differently.

The first and most straightforward is expiry. Copyright is not permanent. It lasts for a defined term, and when that term runs out the work passes into the public domain automatically, with nobody needing to do anything. The exact length of the term depends on where and when the work was published, and it has been extended several times over the last century, which is why the cut-off date moves forward each January rather than sitting still. Films from the silent era make up the bulk of what has expired outright, and every year the boundary creeps a little further into the sound era.

The second route is a missed renewal, and it is the reason so many mid-century films are freely available today. Under the older rules that applied in the United States for much of the twentieth century, copyright had to be actively renewed partway through its term. If the rights holder failed to file that renewal, protection lapsed early and permanently. Studios renewed their prestige titles diligently. What they often did not bother renewing were B-pictures, second features, low-budget thrillers, and films from companies that had folded in the meantime. The result is a strange and rather wonderful accident of paperwork: a large slice of 1940s and 1950s genre cinema is free to watch precisely because it was not considered valuable enough to file for at the time.

The third route is an omitted or defective copyright notice. Older law required a visible notice on the work itself, and a film released without one could fall out of protection immediately. This was rare, but when it happened it could affect a film that was otherwise commercially successful. A handful of well-known titles entered the public domain this way through nothing more than a printing decision on the title card.

There are also works that were never eligible for copyright in the first place. Films produced by government agencies as part of their official work frequently fall into this category, which is why archives of instructional shorts, public information films, and agency documentaries are so deep.

What none of these routes mean is that a film you found on a random website is free to use. A film being hard to buy, out of print, decades old, or unavailable on any subscription service tells you nothing about its copyright status. Plenty of films are simultaneously commercially unavailable and fully protected, and plenty of things circulating online as "public domain" are nothing of the sort. The only reliable approach is to check the specific title against a source that tracks copyright status, which is exactly why our own playable catalogue is narrower than our browsable one.

One more distinction worth holding on to: the underlying film can be in the public domain while a particular restoration, soundtrack, or colourised version of it is not. A studio that spends money digitally restoring a 1930s film may hold rights in that new version even though the original is free. Two copies of what looks like the same film can therefore have entirely different legal status. When we mark something playable, we are pointing at a specific archived copy, not at the title in the abstract.`
  },
  {
    slug: 'film-noir-starter-guide',
    title: 'A Starter Guide to Public Domain Film Noir',
    description: 'Why so much 1940s and 1950s crime cinema is freely available, what makes noir distinctive, and how to approach it if you have never watched one.',
    date: '2026-09-10',
    category: 'Public Domain',
    body: `If you are going to explore one corner of the public domain seriously, film noir is the one that rewards the effort most. The category is deep, the films are short, and a surprising number of them are genuinely good rather than merely interesting as historical curiosities.

The reason there is so much of it comes down to the renewal rules described elsewhere on this blog. Noir was, for the most part, not prestige filmmaking. It was made quickly and cheaply, often as the second half of a double bill, by studios operating well outside the top tier. Those are exactly the films that nobody thought to renew copyright on twenty-eight years later, and so an entire genre slipped into free circulation while the expensive productions of the same era stayed locked up.

What actually makes a film noir? There is no official checklist, and critics have argued about the boundaries for decades, but a few things recur often enough to be useful. Visually, expect high contrast: hard shadows, wet streets at night, light coming through venetian blinds in slats, faces half in darkness. Much of this was a budget decision as much as an artistic one, since shadow is cheaper than set dressing, but the technique became the genre's signature. Structurally, expect a protagonist who is competent but compromised, a plot that turns on deception, and an ending that withholds the clean resolution you might expect from other studio output of the period.

Tonally, the thing that surprises first-time viewers most is the pessimism. These films were made in the 1940s and 1950s, a period often remembered as optimistic, and they are anything but. Characters lose. Plans collapse. The detective solves the case and is worse off for it. That refusal to reassure is a large part of why the genre has aged as well as it has.

A few practical suggestions for approaching noir if you have never watched one.

Start with something short. A great many of these films run between seventy and ninety minutes, which is a very low commitment by modern standards. If it does not grab you, you have lost an hour and a quarter.

Do not fight the dialogue. Noir dialogue is stylised, fast, and full of period slang. Nobody has ever actually spoken this way. Treat it the way you would treat the heightened language in a stage play rather than expecting naturalism, and it stops being an obstacle within about ten minutes.

Expect the picture quality to vary enormously. Public domain prints have been copied, re-copied, and transferred across formats for decades, often without anyone preserving a good source. Some archived copies are crisp; others are soft, scratched, or have audio that drifts. This is worth knowing in advance so a rough print does not put you off the film underneath it.

Watch for the female lead. Noir gave its actresses more to do than most genres of the period, and the best performances in this whole corner of cinema are frequently hers rather than the lead detective's. The character type is often reduced to a cliché in summaries, which does the actual films a disservice.

Pay attention to how much is implied rather than shown. These films were made under content restrictions that prohibited a great deal of what the stories were plainly about. Screenwriters developed an entire vocabulary of implication to work around it, and once you start noticing that machinery, the films become considerably more interesting than their plots alone would suggest.

Noir is also a good genre for the specific way this site works, since the catalogue changes as new archived copies are verified. Filtering by decade and sorting by rating will usually surface the stronger entries faster than browsing alphabetically, and the titles that hold up tend to stay near the top over time.`
  },
  {
    slug: 'silent-films-first-time',
    title: 'How to Watch a Silent Film Without Getting Bored',
    description: 'Silent cinema asks for a different kind of attention than sound film. A few adjustments make the difference between a chore and a discovery.',
    date: '2026-09-08',
    category: 'Public Domain',
    body: `Almost everyone who gives up on silent film gives up for the same reason: they watched it exactly the way they watch a modern film, found it slow, and concluded the whole era was not for them. The films are not the problem. The viewing habits are.

Silent cinema had roughly thirty years to work out how to tell a story entirely through image, gesture, and rhythm, without a single line of spoken dialogue to lean on. What it developed in that time is a genuinely different storytelling language, and like any language it takes a short adjustment period before it stops feeling like work. Here is what actually helps.

Start with comedy. This is the single most useful piece of advice for a first-time viewer. Silent comedy was built on physical action that translates instantly across a century, and the great comic performers of the era were extraordinary athletes as well as actors. You do not need to adjust to anything to find a well-constructed chase sequence funny. Drama is often better filmmaking, but comedy is the easier doorway.

Get the music right. A silent film was never meant to be watched in silence. Cinemas employed pianists, organists, or full orchestras, and the score was doing a large share of the emotional work. A version with a well-matched score plays completely differently from a version with a tinny, arbitrary organ loop bolted on decades later. If a film feels flat and lifeless, try a different copy before writing it off, because the accompaniment may simply be poor.

Watch the frame rate. Early films were shot and projected at speeds slower than the modern standard. When they are transferred without correction, everything moves too fast, which is where the persistent stereotype of jerky, scurrying silent movement comes from. Properly corrected transfers look far more natural than most people expect, and the difference is startling if you have only seen the sped-up kind.

Read the intertitles as punctuation, not as dialogue. The text cards are not there to carry the story; they are there to bridge it. Most of the meaning is in the performances between them. If you find yourself waiting for the next card to tell you what is happening, you are reading the film backwards, and it will feel slow because you are ignoring the half that is actually doing the work.

Accept the acting style on its own terms. The broad, legible performance style of silent film was not naivety. It was a solution to a real problem: conveying interior states to the back row of a large room with no voice available. Once the camera moved closer and technique developed, performances became remarkably subtle, and the best silent acting is quieter than its reputation suggests.

Pick shorter films to begin with. Plenty of the era's best work runs twenty to sixty minutes. A short is a much better introduction than a two-hour epic, and the format was taken seriously rather than treated as a lesser form.

Give it a full twenty minutes before deciding. The adjustment genuinely takes about that long. Viewers who push through that first stretch usually report that the strangeness drops away and they simply stop noticing the absence of dialogue at all.

One last thing worth knowing: a large fraction of silent cinema no longer exists. Nitrate film stock was chemically unstable and flammable, studios routinely destroyed prints to reclaim the silver in them, and archival preservation was not a priority until the damage was well advanced. Most films from the era are gone permanently. What survives in the public domain is not a complete picture of the period but a partial, lucky sample, which is a decent reason to treat the surviving titles as worth a look rather than as an inexhaustible pile.`
  },
  {
    slug: 'why-old-films-look-different',
    title: 'Why Old Films Look the Way They Do',
    description: 'Aspect ratio, film grain, black-and-white contrast, and print damage: what you are actually seeing when an older film looks unfamiliar.',
    date: '2026-09-05',
    category: 'Film Craft',
    body: `A lot of viewers bounce off older films before the story has had a chance to start, and the reason is usually visual rather than narrative. Something about the image looks wrong compared to what they are used to. Almost all of it has a concrete technical explanation, and knowing what you are looking at makes it much easier to stop noticing.

The most obvious difference is shape. Films made before the mid 1950s were generally composed in a squarish frame, close to the proportions of an old television set. Widescreen formats arrived largely as a competitive response to television, and once they did, the standard frame stretched out and never went back. When an older film is shown on a modern display you will see bars down either side. Those bars are correct. What is not correct is the alternative some services apply, which crops the top and bottom to fill the screen and quietly throws away a third of what the director framed. If you have a choice, always take the version with the bars.

Then there is grain. Photographic film records an image using light-sensitive crystals, and those crystals are physically visible as texture in the final picture. Faster film stocks, used for low light, have larger crystals and therefore more visible grain. This is not damage or compression artefacting, and modern attempts to scrub it away with noise reduction generally make the image look waxy and smeared rather than clean. Grain is part of how the picture was meant to look.

Black-and-white deserves more credit than it usually gets. Filmmakers working in monochrome were not making a compromised version of colour; they were working in a medium with its own rules, where contrast, shadow and texture carry the information that colour would otherwise provide. Cinematographers lit very deliberately for it, and costume and set designers chose materials for how they read in grey rather than how they looked in person. A well-shot black-and-white film contains an enormous amount of visual information. It simply encodes it differently.

Motion can look unfamiliar too. Modern cameras and displays have accustomed most viewers to very smooth movement. Older projection standards produce a slightly different sense of motion, and any transfer that has been converted between frame rate standards may introduce judder in panning shots. It is a transfer artefact rather than something wrong with the original.

Damage is its own category, and it is the one most specific to public domain material. A film that has been duplicated repeatedly, often from an already imperfect copy, accumulates scratches, dust, splices where damaged frames were cut out, flickering brightness, and audio that hisses or drifts out of sync. Some archived copies are excellent; others have clearly been through several generations of duplication. This is worth being realistic about: when a film has no commercial rights holder, nobody has a financial incentive to fund a restoration, so the best surviving copy may simply be rough.

Sound has its own history. Early sound recording had a much narrower frequency range than we are used to, which is why voices in early talkies can sound thin and boxy. Dialogue was often recorded live on set with a fixed microphone, which limited how much actors could move and encouraged the stagey, static staging that people associate with the period. Post-production dubbing changed that, and films from only a few years later move far more freely as a result.

None of this requires technical knowledge to enjoy a film. But it does help to know that most of what reads as odd is a deliberate choice or a known limitation of the era rather than carelessness. Films were made by people solving hard problems with the tools they had, and the visual language they built inside those constraints is often more inventive than what gets made when the constraints disappear.`
  },
  {
    slug: 'sci-fi-before-cgi',
    title: 'Science Fiction Before Computer Effects',
    description: 'Miniatures, matte paintings, forced perspective and optical printing: how filmmakers built impossible images with entirely physical tools.',
    date: '2026-09-02',
    category: 'Film Craft',
    body: `The interesting thing about early screen science fiction is not that the effects look dated. It is how much was achieved with nothing but physical objects, careful camera placement, and a great deal of patience. Every impossible image on screen before the digital era had to exist somewhere in the real world first, even if only as a two-foot model hanging on a wire.

Miniatures did most of the heavy lifting. Spacecraft, cities, laboratories and monsters were built at reduced scale and filmed in a way that disguised their size. The craft of it lies almost entirely in the details: the smaller the model, the faster it appears to move on film, so miniature work is typically shot at high frame rates and played back slowly to restore a convincing sense of mass. Water is notoriously difficult to miniaturise for exactly this reason, which is why model ships in a tank rarely convince and model spacecraft in a vacuum frequently do.

Matte paintings extended sets beyond what any budget could build. A painting on glass, positioned in front of the lens so it lined up precisely with the live-action set behind it, could turn a modest standing structure into a vast alien city. The technique required extraordinary precision, because the painted portion and the filmed portion had to share a single vanishing point and consistent lighting. When it works you cannot see the join at all, and a great deal of celebrated production design from the period is in fact paint on glass.

Forced perspective solved scale problems without any post-production at all. Place an object close to the camera and an actor much further away, compose so that they appear to occupy the same space, and one of them appears enormous. The whole effect lives in a single fixed camera position, which is why shots built this way rarely move. It costs nothing but geometry.

Optical printing was the closest thing the era had to compositing. Two or more strips of film were re-photographed together, allowing a figure shot separately to appear inside a scene they were never physically present for. Each generation of re-photography degraded the image slightly, which is why composited elements in older films often look softer or grainier than the footage around them. That mismatch is a fingerprint of the technique rather than sloppiness.

Stop-motion animation gave creatures a quality that is genuinely hard to reproduce by other means. A model was moved fractionally between individual exposed frames, by hand, for as long as it took. A few seconds of screen time could take days. The slight irregularity in the resulting motion is part of why these creatures feel physically present in a way that smoother animation sometimes does not.

In-camera tricks filled the gaps: mirrors, partially silvered glass, painted backdrops, reversed footage, undercranking to speed up action, and rear projection to put a moving background behind a stationary actor. Rear projection in particular is instantly recognisable once you know to look for it, and it appears in almost every driving scene made for several decades.

What all of this shares is a physical logic. The filmmakers were photographing something real and controlling how the camera interpreted it. That constraint shaped the storytelling as much as the imagery, because an effect that took a week to shoot could not be thrown away in a two-second cut. Sequences were designed around a small number of expensive images, held long enough to be worth the cost, with the rest of the story built to lead into and out of them.

Watching this material with some sense of how it was made changes the experience considerably. The question stops being whether it looks convincing by current standards and becomes how on earth they got the shot at all, which is a much more interesting question and one that older science fiction answers again and again.`
  },
  {
    slug: 'public-domain-documentaries',
    title: 'The Documentary Archive Nobody Talks About',
    description: 'Government films, educational shorts and industrial documentaries make up a huge share of freely available footage, and much of it is genuinely fascinating.',
    date: '2026-08-30',
    category: 'Public Domain',
    body: `When people picture the public domain, they picture feature films. The larger and stranger part of it is non-fiction: instructional shorts, agency documentaries, newsreels, industrial films, training material, and public information campaigns produced across most of the twentieth century. A great deal of this was never under copyright at all, because work produced by government agencies as part of their official duties generally is not eligible for it.

The volume is remarkable. Agencies produced films on agriculture, public health, civil engineering, transport safety, nutrition, weather, wildlife, and every other subject they had a remit for. Schools commissioned educational shorts on more or less everything a curriculum touched. Companies made industrial films to train staff, sell equipment to other companies, and explain their own processes. Almost none of it was made for entertainment, and almost all of it is available now.

What makes it worth watching is not usually the stated subject. It is the incidental record. A ten-minute film explaining how to operate a piece of farm machinery is also, unintentionally, a detailed record of what that farm looked like, how people dressed, how they spoke, what the landscape was like before it was developed, and what was considered obvious enough to leave unexplained. Non-fiction film made for a functional purpose captures ordinary life with a directness that fiction almost never manages, precisely because nobody was trying to capture it.

The tone takes some adjustment. The narration style of mid-century institutional film is confident to the point of comedy by modern standards: authoritative, unhurried, entirely certain. Social attitudes of the period are present and frequently uncomfortable. The films were made to persuade as much as to inform, and a good number of them are, viewed now, obvious propaganda for one position or another. That does not make them less interesting, but it does mean they are historical documents rather than neutral records, and worth watching with that in mind.

A few categories stand out.

Public health films document how institutions communicated risk, and comparing campaigns across decades shows how dramatically both the science and the messaging changed.

Civil engineering and infrastructure films tend to be visually spectacular almost by accident, because dams, bridges and tunnels photograph well and the crews filming them had good access.

Nature and wildlife films from agency programmes often contain footage of habitats and species in states that no longer exist, which gives them a documentary value nobody anticipated at the time.

Space and aviation programmes generated enormous quantities of film, much of it technical documentation shot for engineering review rather than public release, and some of it extraordinary.

Educational shorts aimed at children are the most revealing of all, because what a society chooses to explain to its children, and how, says a great deal about what it took for granted.

Newsreels sit slightly apart. Many were commercially produced and their copyright status varies title by title, so they are worth treating carefully rather than assuming availability.

The practical difficulty with this material is discovery. It is scattered across archives, indexed inconsistently, and often catalogued under bureaucratic titles that reveal nothing about the content. A film with an unpromising name may be twenty minutes of superb location footage. There is no substitute for browsing, and the ratio of dull to fascinating is high enough that patience is required.

None of this is prestige cinema, and the individual films rarely amount to more than a curiosity on their own. Taken together, though, they form one of the most detailed audiovisual records of the last century that exists, and unlike almost everything else of comparable scope, it belongs to everybody.`
  },
  {
    slug: 'internet-archive-film-collection',
    title: 'What the Internet Archive Is, and Why We Use It',
    description: 'The non-profit library behind our full-length playback, how its moving image collection works, and why we verify titles against it.',
    date: '2026-08-28',
    category: 'Policy',
    body: `Every full-length film that plays on CineStream is served from the Internet Archive. Since that single decision shapes what our playable catalogue can and cannot contain, it is worth explaining what the Archive actually is and why we built around it rather than around the embed sources that similar sites typically use.

The Internet Archive is a non-profit digital library. It has been collecting and preserving digital material since the mid 1990s, and its scope is broad: archived web pages, books, audio recordings, software, and a very large moving image collection. Its stated purpose is universal access to knowledge, and it operates under library principles rather than commercial ones. It is not a video host that happens to have old films on it; it is a preservation institution that makes its holdings publicly accessible.

The moving image collection is built from a mix of sources. Some material was digitised by the Archive itself. A great deal was contributed by individual collectors, film societies, and institutions with holdings they wanted preserved. Government agencies have deposited large quantities of material. Some collections came from commercial libraries that donated or released their catalogues. The result is uneven in exactly the way a donated library is uneven: enormously rich in places, thin in others, and catalogued with varying care.

For our purposes the important property is that the Archive maintains item-level records, each with a stable identifier and an embeddable player. That lets us do something specific: before we mark any title as fully playable, we check it against the Archive's catalogue and link to a particular archived item. If no matching item exists, the title stays browsable but not playable. There is no fallback, no secondary source, and no scraping of third-party streaming hosts to fill the gap.

This is a deliberately restrictive design, and it costs us catalogue size. A site willing to embed whatever video host happens to have a copy can appear to offer everything. We can offer trailers and metadata for everything, and full playback only for the subset that a public library has already established as freely distributable. We think that is the only version of this that is defensible, and it is also the only version that could ever carry advertising honestly.

A few honest caveats about relying on an archive rather than a distributor.

Quality varies widely, because the Archive preserves what it receives. A donated transfer from a worn print stays a transfer from a worn print. There is no remastering pipeline.

Metadata varies too. Titles are sometimes inconsistent, years are occasionally wrong, and the same film can appear as several separate items uploaded by different contributors. Our matching checks for a close title correspondence, but no automated match is perfect, and a mismatch is possible.

Availability is not guaranteed forever. Items can be removed, most often when a rights holder establishes a claim that a particular upload was not eligible in the first place. When that happens, playback for the affected title stops working on our side too, which is a limitation we would rather name than pretend away.

Playback happens through the Archive's own embedded player rather than through our infrastructure. We are not copying files, re-hosting video, or serving anything ourselves. Streaming happens directly between the viewer and the Archive under its own terms of use.

The Archive is a non-profit and runs on donations. If the material matters to you, it is worth supporting directly. A meaningful amount of what is freely watchable today exists because an institution chose to preserve it when no commercial entity had any reason to, and that is not a permanent condition unless people fund it.`
  },
  {
    slug: 'legal-vs-pirate-streaming',
    title: 'How to Tell a Legitimate Streaming Site From a Pirate One',
    description: 'Practical signals that separate sites operating within copyright from sites that are not, and why the distinction matters for your security as well as the law.',
    date: '2026-08-26',
    category: 'Guides',
    body: `Search for almost any film title and you will find a long tail of sites offering to stream it immediately, free, in high definition, with no account required. Most of them are operating illegally, and a significant number of them are also actively hostile to the people using them. The signals that separate the two categories are not subtle once you know what to look at.

Start with the catalogue. This is the clearest single indicator. Legitimate free services have restricted catalogues, because licensing costs money and public domain material is finite. If a free site claims to offer current cinema releases, complete runs of subscription-exclusive series, and everything from the last five years, it does not have licences for any of it. No exception to this has ever existed. Breadth is the tell.

Look at what the site says about its sources. An operator working within the rules will explain where video comes from, because it is a point in their favour. A pirate site is typically vague, or hides behind a boilerplate line claiming it does not host files and merely indexes third-party embeds. That disclaimer has no legal effect, and its presence is itself a signal: sites with legitimate sourcing do not need it.

Check whether real policy pages exist. A privacy policy, terms of service, a functioning contact route, a named operator, and a copyright or takedown procedure are basic requirements for any site expecting to be treated as legitimate. Pirate sites often have none of these, or have obviously copied versions that name a different site entirely.

Watch the advertising behaviour. Mainstream advertising networks enforce content policies, so sites operating outside the law cannot use them and end up on networks that do not ask questions. The result is the familiar pattern: pop-unders, redirect chains, fake player buttons that are actually ads, countdown timers, prompts to install an extension or player, and aggressive notification permission requests. A page where you cannot tell which button starts the video is not badly designed. It is designed exactly as intended.

Be sceptical of anything asking you to install something. No legitimate streaming site needs a special player, codec pack, or browser extension to play video in a modern browser. Every one of those prompts is either adware or worse.

Notice whether the site pressures you. Countdown timers, repeated modal dialogues, claims that a download slot is about to expire, and manufactured urgency of any kind belong to a category of site that is monetising confusion rather than content.

There are real risks beyond the legal ones. Malicious advertising is the primary distribution route for a lot of browser-based malware. Credential harvesting through fake sign-in prompts is common. In some jurisdictions, accessing infringing streams carries direct consequences for the viewer rather than only for the operator, and enforcement practice varies enough that it is worth knowing your local position rather than assuming.

The legitimate free options are more numerous than most people realise. Public domain archives hold a very large body of material. Ad-supported services operated by established broadcasters and studios carry substantial licensed catalogues at no cost. Public libraries in many countries provide free access to curated streaming platforms with a library card. National film institutes and cultural agencies publish restored material. Plenty of independent filmmakers release work directly under open licences.

For what it is worth, this site sits on the restrictive side of that line by construction. Full playback here is limited to public domain titles verified against a public archive. Everything else is metadata, trailers and reviews. The catalogue is smaller as a result, and that is the trade-off.`
  },
  {
    slug: 'where-our-movie-data-comes-from',
    title: 'Where Our Movie Data Comes From',
    description: 'The metadata behind every detail page: what TMDB is, what we take from it, what we compute ourselves, and where the gaps are.',
    date: '2026-08-24',
    category: 'Behind the Scenes',
    body: `Every poster, synopsis, cast list, runtime, rating and release year on this site comes from The Movie Database, usually shortened to TMDB. Since that is the foundation the whole catalogue rests on, here is a plain account of what it is, what we do with it, and where its limits show.

TMDB is a community-maintained database of film and television metadata. Its records are created and edited by contributors rather than by a central editorial team, in a model closer to a wiki than to a commercial data licence. It has been running for a long time, it covers an enormous number of titles across many languages and regions, and it makes its data available through a public interface that developers can build on. That combination is unusual: most comprehensive film databases are either closed or expensive.

What we pull from it is straightforward. Titles, release dates, synopses, genre tags, runtimes, poster and backdrop images, cast and crew credits, user ratings with vote counts, and trailer references. We request data in near real time rather than keeping a stale local copy, which is why the catalogue shifts as the source database is updated by its contributors.

What we do not take from it is the organisation of the site itself. The homepage rows, the ordering within them, the genre balance rules, the filter behaviour, the related-titles logic and the rating presentation are all ours, computed from the underlying data rather than copied from someone else's chart. That distinction matters to us: we are using a data source, not republishing another site's editorial output.

Community-maintained data has predictable strengths and weaknesses, and it is fairer to name them than to present the catalogue as authoritative.

Coverage is uneven. Popular titles have detailed records with full credits and multiple images. Obscure titles, particularly older and non-English ones, may have a single line of synopsis and no poster. When you see a title with a placeholder image, that is a gap in the source rather than a rendering fault.

Ratings depend on who bothered to vote. A film with forty votes has a rating that a handful of people determined. We surface vote counts for exactly this reason, because a score without a sample size is close to meaningless.

Duplicates and near-duplicates exist, as they do in any contributed dataset. Remakes, re-releases, and films sharing a title can be confusing to disambiguate automatically.

Synopses vary in quality and occasionally contain spoilers, since they are written by contributors with different ideas about what a summary should include.

Regional and language coverage skews toward what the contributor base watches, which means some national cinemas are represented far more thinly than their actual output would suggest.

Trailer availability is inconsistent. When a detail page reports no trailer, it means the source database has no trailer reference for that title, not that none was ever made.

We also keep a hard separation between metadata and playback. Having a rich detail page for a film says nothing about whether we can stream it. Playback is decided entirely separately, by checking the title against a public domain archive, and the overwhelming majority of titles you can browse here are not playable in full for exactly that reason.

Finally, the attribution: this product uses the TMDB API but is not endorsed or certified by TMDB. If you spot a record that is wrong, the fix belongs upstream rather than with us, and TMDB accepts corrections from anyone willing to make an account. Improving a record there improves it for every site and application built on the same data, which is a reasonable argument for taking the trouble.`
  },
  {
    slug: 'rating-scales-compared',
    title: 'Every Rating Scale Means Something Different',
    description: 'Ten-point averages, five-star systems, critic percentages and audience scores measure different things. Reading them as interchangeable is a mistake.',
    date: '2026-08-21',
    category: 'Guides',
    body: `A film can carry a 7.2, three and a half stars, 89 percent, and a middling audience score all at once, and none of those numbers contradict the others. They are measuring different things in different ways, and treating them as a single interchangeable quantity is the most common mistake people make when deciding what to watch.

The ten-point average is the format used here and on most metadata-driven sites. Every voter picks a number and the platform reports the mean. Its main quirk is that the usable range is much narrower than it looks. In practice almost everything lands between about five and eight and a half, because people rarely use the extremes. A 6.0 is not the midpoint of quality, it is a below-average film. A 7.5 is solid. Anything above 8.0 with a large vote count is genuinely unusual. Calibrating to that compressed range is most of what it takes to read these scores accurately.

Five-star systems behave differently because the granularity is so coarse. With half-star increments there are only ten possible values, so the difference between three and a half and four stars can represent a wide range of underlying opinion. The upside is that coarse scales are easier for people to use consistently, so the aggregate is often more stable than a ten-point average built on the same number of votes.

Critic percentage scores are the most widely misread of all. The best-known of these does not average how much critics liked a film. It counts what proportion of reviews were broadly positive. A film where every single critic said it was mildly enjoyable can score higher than a film that half of them called a masterpiece and half disliked. A very high percentage means near-unanimous mild approval at minimum; it does not mean the film is extraordinary. Conversely, a divisive score is not the same as a bad one.

Weighted averages add another layer. Some platforms adjust raw scores to resist manipulation, discounting accounts with little history or applying a prior that pulls low-vote titles toward the middle. This is why a film can show a different number on two sites that both claim to report a user average. Neither is lying; the weighting differs.

Audience scores and critic scores diverge for structural reasons, not because one group is right. Critics watch far more films and grade against a much larger reference set, which makes them harder to impress by competence alone and more receptive to ambition that does not entirely work. General audiences vote on whether they enjoyed the experience. A wide gap between the two is genuinely informative: it usually means a film is doing something that rewards familiarity with the form, or conversely that it is delivering exactly what its audience wanted while offering critics nothing new.

Vote count matters as much as the score. Forty votes is a group of strangers. Forty thousand is a measurement. We show vote counts alongside ratings specifically because a high score on a tiny sample is one of the easiest ways to be misled.

Timing matters too. Scores taken in a release week skew high, because the first people to see anything are the people who most wanted to. Ratings tend to settle downward over the following weeks as a broader audience arrives, and some films recover over years as reputations are revised.

The practical advice is simple enough. Use the number as a filter, not a verdict: it is good for excluding the clearly poor and shortlisting candidates. Then read two or three actual reviews, which will tell you why the number is what it is. A slow, difficult film and a competent, forgettable one can share a score, and only the text will tell you which you are about to sit down with.`
  },
  {
    slug: 'watchlist-habits',
    title: 'How to Keep a Watchlist You Actually Use',
    description: 'Most watchlists become graveyards. A few habits keep yours short enough to be useful when you have ninety minutes and no idea what to watch.',
    date: '2026-08-19',
    category: 'Guides',
    body: `Almost everyone who uses a watchlist ends up with the same problem. It grows steadily, nothing ever comes off it, and eventually opening it produces the exact paralysis it was supposed to prevent. The list becomes a record of intentions rather than a tool, and people stop using it without ever deciding to.

The underlying issue is that adding is frictionless and removing is not. It takes a second to save something and a small act of judgement to admit you are never going to watch it. Over a year of saving three things a week, that asymmetry produces a list nobody can face.

A few habits fix this, and none of them require any particular discipline.

Cap it. Pick a number you can scan without scrolling, somewhere around twenty or twenty-five, and treat it as fixed. When you want to add something and the list is full, you have to remove something. This forces exactly the small judgement that never otherwise happens, and it turns the list into a shortlist rather than an archive.

Save with a reason attached, even if only mentally. There is a large difference between saving a film because a friend whose taste you trust insisted, and saving it because you saw a poster. Six months later, the first is still worth watching and the second is a stranger. If your list supports notes, one line is enough.

Be honest about mood. Most lists collapse because they mix registers: a demanding four-hour drama sits next to a comedy you would watch tonight, and every time you open the list you have to re-sort them in your head. Keeping the difficult and the easy separate, even loosely, means you can pick from the right half without negotiating with yourself.

Prune on a schedule rather than in the moment. Once a month, go down the list and remove anything you have passed over more than a few times. Passing over something repeatedly is real information: you are consistently not in the mood for it, and that is unlikely to change. Removing it is not a verdict on the film.

Distinguish saving from tracking. A saved list is about intent. A watch history is about what actually happened. Conflating them produces a list where you cannot tell what is still pending, which is why those two things are separate features here rather than one combined list.

Add the specific rather than the general. Saving a director, a genre, or a vague idea of "more Japanese cinema" produces a list you cannot act on. Saving a particular title with a particular running time produces one you can.

Use the list when you are in a decisive mood, not only when you are choosing what to watch. The worst moment to pick a film is the moment you sit down and want to start immediately, because that is when the shortest path wins and you end up rewatching something familiar. Choosing tomorrow's film today, when there is no pressure, produces better choices.

Accept that some things will never get watched, and let that be fine. A watchlist is not a debt. Removing something you have carried for a year is not a failure; it is the list doing its job, which is to hold the things you are genuinely likely to watch and nothing else.

The measure of a good list is simple: when you have ninety minutes free and no idea what to do with them, does opening it help? If the answer is no, the list is too long, not too short.`
  },
  {
    slug: 'choosing-by-runtime',
    title: 'Runtime Is the Most Underrated Way to Choose a Film',
    description: 'Length is not a proxy for quality, but it is a very good proxy for what a film will ask of you. Here is how to use it.',
    date: '2026-08-17',
    category: 'Guides',
    body: `People filter by genre, rating and year constantly, and almost never by runtime, which is strange because runtime predicts your actual experience of an evening better than any of them. Two well-reviewed dramas of the same vintage can ask completely different things of you depending on whether one runs ninety minutes and the other runs three hours.

Length is not a quality signal in either direction. Long films are not more serious and short films are not slighter. What length does reliably signal is structure, and structure is what determines whether a film fits the evening you actually have.

Under ninety minutes, a film has no room for a subplot. Everything present has to be doing work, and the result is usually tight, propulsive and unambiguous about what it is. An enormous amount of the best genre cinema lives here, particularly from the studio era, when second features were built to a strict length. This is also the range where a film that does not work costs you very little.

Between ninety minutes and two hours sits the default. There is room for a secondary thread, a subplot that pays off, a middle section that breathes. Most films you have ever seen are in this band, and it is the safest choice when you want something satisfying without a commitment.

Past two hours, something changes. The film is no longer just telling a story; it is asking for sustained attention and usually spending the extra time on interiority, scope, or accumulation. Epics, ensemble pieces and character studies need the room. But the extra time has to be earned, and a two-and-a-half-hour film that would have worked at a hundred minutes is a specific and common kind of disappointment.

Past three hours you are in the territory of films designed as events. Many are excellent. Almost none are suitable for a weeknight, and watching one in three sittings genuinely changes it, because the cumulative effect these films are built around depends on continuity.

A few practical ways to use this.

Match the runtime to your attention, not to your available time. Having three hours free is not the same as having three hours of attention, and the second is what a long film needs.

When in doubt on a weeknight, go short. A ninety-minute film you finish beats a two-hour film you abandon halfway and never return to, and the abandoned film is much harder to start again than most people expect.

Use runtime to break decision paralysis. When nothing appeals, filtering to things under a hundred minutes shrinks the field dramatically and lowers the stakes of the choice, which is usually the real obstacle.

Notice pacing within the runtime. A hundred-minute film with a slow, deliberate style can feel considerably longer than a two-hour film that moves. Reviews will tell you which you are dealing with far more reliably than the number alone.

Be aware that older films tend to run shorter, particularly outside the prestige tier. If you habitually find modern films bloated, the mid-century catalogue is likely to suit you, and a great deal of it is freely available.

Keep a couple of short, reliable options identified in advance. The specific failure mode worth avoiding is spending forty minutes choosing and then having time for nothing. Knowing two eighty-minute films you would happily watch removes that failure entirely.`
  },
  {
    slug: 'tv-series-vs-films',
    title: 'Browsing Series Is Not the Same as Browsing Films',
    description: 'Why we keep TV and film in separate tabs, and how ratings, runtimes and recommendations all behave differently for episodic work.',
    date: '2026-08-14',
    category: 'Behind the Scenes',
    body: `We keep films and television in separate tabs rather than mixing them into one catalogue, and the reason is not tidiness. Almost every attribute we use to organise a catalogue behaves differently for episodic work, to the point where combining them makes both worse.

Consider the rating first. A film has one rating covering one object. A series that ran for six seasons has a single headline rating covering something that may have changed substantially between its first and last year. Shows that started weakly and improved, and shows that were excellent for three seasons and then were not, both end up with an unremarkable average that describes neither state. The number is real, but it is answering a different question than a film rating answers, and putting the two in one sorted list quietly implies a comparison that does not hold.

Runtime is the same problem in a more obvious form. A film's runtime tells you what you are committing to. A series lists an episode length, which tells you almost nothing about the commitment, since the real figure is that length multiplied by anything from six episodes to two hundred. Sorting a mixed list by duration produces nonsense.

Recency behaves differently too. A film has a release date and that is that. A series has a first air date, a most recent air date, and possibly a long gap in between, and which of those counts as its date depends entirely on what you are trying to find. A show that premiered eight years ago and released a new season last month is simultaneously old and new.

Genre distributions differ as well. Some categories are far more common in one medium than the other, and rating baselines within a genre are not consistent across both. A minimum rating filter tuned to feel useful across films will exclude more television than it should, or vice versa, because the underlying distributions are not the same shape.

This is also why filters do not carry across the tabs when you switch. It looks at first like an oversight, and people occasionally tell us so. But a filter set that produces a good shortlist of films will frequently produce an empty or misleading one when applied unchanged to series, and silently carrying it across means the user sees a thin result and concludes the catalogue is thin. Resetting at the boundary is the less confusing behaviour, even though it costs a little convenience.

Detail pages differ in what they can usefully show. For a film, cast and synopsis describe the whole thing. For a series, a cast list can span years of changing regulars and a synopsis has to describe a premise rather than a plot, because summarising the actual story would mean summarising dozens of hours. Season counts do more useful work here than a synopsis does.

Related titles work differently as well. Film similarity can lean on genre, era and tone reasonably well. Series similarity depends heavily on format: a half-hour comedy and a prestige hour-long drama can share every genre tag and have nothing in common as viewing experiences.

None of this means one medium is better organised than the other. It means they need different handling, and a single merged list would end up serving whichever one the sorting logic happened to favour. Keeping them separate lets each set of rows, filters and thresholds be tuned for what it is actually describing, which is why the tab you are in changes more than just which posters appear.`
  },
  {
    slug: 'subtitles-and-accessibility',
    title: 'Subtitles, Captions, and Why They Are Not the Same Thing',
    description: 'The difference between subtitles and closed captions, why archival films often have neither, and what to do about it.',
    date: '2026-08-12',
    category: 'Guides',
    body: `Subtitles and captions are used interchangeably in everyday speech and are genuinely different things, made for different reasons, with different content. The distinction matters most with older and archival material, where you often get one, neither, or something mislabelled as both.

Subtitles assume you can hear the audio but not understand it. They translate spoken dialogue into another language and generally nothing more. A subtitle track for a French film in English renders what people say, and leaves everything else to your ears.

Captions assume you cannot hear the audio at all. Alongside dialogue they carry speaker identification, sound effects, music cues, and tonal information: a door closing, a phone ringing offscreen, ominous music beginning, someone shouting from another room. That non-dialogue information is frequently essential to following a plot, which is why captions are an accessibility feature in a way that plain subtitles are not.

Same-language subtitles sit between the two and are what most streaming services actually provide when you turn on what they call captions. They transcribe dialogue accurately but omit most of the audio context, which is adequate for watching in a noisy room and inadequate as an accessibility provision.

With archival and public domain material, the situation is usually worse. Captioning was not a legal or commercial requirement when most of this material was made or when it was digitised, and adding a caption track to an old film is manual work that nobody is paid to do. Many archived copies therefore have no text track at all. Where tracks exist they are often community-contributed, of variable accuracy, and sometimes synchronised to a different cut than the copy you are watching.

Automatic speech recognition has improved enormously but struggles precisely where archival material is hardest: low-fidelity mono audio, heavy period accents, overlapping dialogue, and background noise. Machine-generated tracks on older films can be close to unusable, and worse, confidently wrong in ways that mislead rather than simply omit.

Silent films are a special case and a happier one. Their intertitles are part of the image, which means the text is always present, always synchronised, and requires no separate track. The catch is that translations of intertitles are baked into the image too, so a given copy is fixed to whatever language its cards are in. If you find a silent film with cards you cannot read, look for a different archived copy rather than a subtitle file.

A few practical notes. If a film has multiple archived copies, they may differ in whether text is burned in, and trying another can solve the problem outright. Headphones help considerably with thin, compressed mono audio from early sound films, more than raising the volume does. And if you rely on captions, it is worth knowing in advance that a substantial share of freely available archival cinema simply does not have them, which is a real gap rather than something we can present around.

Where playback happens through an external archive player, as it does here for full-length titles, the available text tracks are whatever that archived copy carries. We are not in a position to add tracks to material we do not host. Being straightforward about that seems better than leaving people to discover it after pressing play.`
  },
  {
    slug: 'family-movie-night',
    title: 'Picking a Film for a Room With Different Tastes',
    description: 'Choosing for a group is a different problem from choosing for yourself. What actually works when ages and tolerances vary.',
    date: '2026-08-09',
    category: 'Guides',
    body: `Choosing a film alone is a taste problem. Choosing one for a room is a negotiation problem, and the usual approaches to it fail in predictable ways. The most common failure is to look for the film everyone will love, which tends to produce forty minutes of scrolling and a compromise nobody is enthusiastic about. Aiming instead for the film nobody actively objects to is less romantic and works considerably better.

Decide the constraints before opening anything. Runtime, rough tone, and whether anyone present needs to be up early are all easier to agree in the abstract than while looking at posters. Once people are looking at specific titles, every conversation becomes an argument about that title rather than about what kind of evening this is.

Shrink the field before you offer choices. Three options is a decision; thirty is a stalemate. Whoever is holding the remote should filter down first and present a genuine shortlist. This feels autocratic and is universally appreciated.

Runtime is the most useful lever in a mixed room. Under a hundred minutes keeps younger and more restless viewers engaged and gives everyone else an easy yes, because the cost of being wrong is low. Long films are for rooms that have already agreed to a long film.

Older films are underrated for mixed groups, and the public domain is unusually well suited here. Silent comedy in particular plays across an enormous age range, for a simple reason: physical comedy needs no reading, no cultural reference, and no explanation. A child who cannot yet read intertitles will still follow a chase sequence perfectly. Early adventure and fantasy films work similarly, and their effects, which adults may find quaint, are often more interesting to children than seamless modern ones because you can see how they were done.

Check content in advance rather than during. Ratings systems from different eras and countries are not comparable, and older films can contain material that would be rated very differently today, both in ways that seem mild now and in ways that do not. Period attitudes, particularly in mid-century material, can be genuinely uncomfortable and arrive without warning. Reading a summary or a couple of reviews beforehand takes two minutes and avoids an abrupt decision in front of everyone.

Consider watching something short first if the room is unsettled. A twenty-minute short gets everyone seated and attentive, and it functions as a low-stakes trial of whether this group is in the mood for anything at all. If the short does not land, you have learned that without burning an evening.

Let the choosing rotate rather than optimising every time. A room where one person always picks produces resentment, and a room where everyone gets a turn produces the occasional dud that nobody minds because the rule is fair. The fairness matters more than the hit rate.

Be willing to stop. An abandoned film is not a wasted evening, and continuing out of sunk cost with half the room bored is worse than switching. This is easier when the shortlist still exists, which is another argument for choosing three and not one.

Finally, lower the stakes generally. The goal is people in the same room for two hours, not a perfect selection. Films that are merely good and immediately watchable beat films that are excellent and require everyone to concentrate, at least on a weeknight with a mixed audience.`
  },
  {
    slug: 'streaming-playback-quality',
    title: 'What Actually Determines Streaming Quality',
    description: 'Source resolution, bitrate, connection speed and display all limit each other. Knowing which one is the bottleneck saves a lot of guessing.',
    date: '2026-08-06',
    category: 'Guides',
    body: `When a stream looks bad, the instinct is to blame the connection. Sometimes that is right. Often it is not, and knowing which of several independent limits is actually binding saves a lot of pointless troubleshooting.

Playback quality is capped by a chain, and the weakest link decides the result. The chain runs: the source copy, the encoding of that copy, the delivery, your connection, your device, and your display. Improving anything other than the current bottleneck changes nothing at all.

The source copy is the limit people forget, and with archival material it is usually the binding one. A film digitised decades ago from a worn print, at standard definition, cannot be improved by a faster connection or a better television. There is no additional detail to recover. Much public domain material sits in exactly this state: the best surviving copy is soft, scratched or low resolution, because no commercial entity had reason to fund a restoration. A slow, grainy old film on a gigabit connection is still a slow, grainy old film.

Bitrate matters more than resolution, and this is the single most useful thing to understand. Resolution is how many pixels there are; bitrate is how much data is spent describing them each second. A 1080p stream at a low bitrate looks worse than a 720p stream at a generous one, particularly in scenes with rain, smoke, fast motion or fine texture, where compression runs out of budget and produces blocking and smearing. Services advertise resolution because it is a bigger number, but bitrate is what you are seeing.

Adaptive streaming complicates the picture. Most modern players switch quality dynamically based on available bandwidth, which is why a stream can begin soft and sharpen after a few seconds, or degrade mid-scene when the network wobbles. If quality visibly fluctuates, that is adaptation working as designed rather than a fault.

Your connection matters, but less than people assume, and the relevant number is sustained throughput rather than peak speed. Video needs a steady floor, not a high ceiling. A connection that bursts fast and then stalls produces worse playback than a slower but consistent one. Latency and packet loss affect buffering behaviour more than raw speed does, which is why streaming over a congested wireless network can be poor even when a speed test looks fine.

The device and browser impose their own limits. Hardware decoding support varies by codec, and a device without acceleration for a particular format may fall back to software decoding, which can drop frames on older machines. Battery saving modes on laptops and phones frequently reduce playback quality deliberately.

The display is the final cap and the least interesting one. Beyond a certain point, viewing distance makes resolution differences invisible, and for a lot of living room setups the practical ceiling is lower than the specification suggests.

Two things worth knowing specifically about this site. Full-length public domain titles play through an external archive's player, so their quality is determined by whatever copy that archive holds and how it was encoded. Trailers play through an external video service and generally look far better than the archival features, which surprises people until they realise the trailer is a modern digital file and the feature is a decades-old transfer.

If something looks poor, the quickest diagnostic is comparison. If trailers look fine and features do not, the source copy is your bottleneck and nothing at your end will change it. If everything looks poor, start with the network and the device.`
  }
];
