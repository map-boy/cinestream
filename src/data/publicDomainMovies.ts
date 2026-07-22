const ARCHIVE_SEARCH_URL = 'https://archive.org/advancedsearch.php';
const archiveCache = new Map<string, string | null>();

export async function findArchiveMatch(title: string, year?: number): Promise<string | null> {
  const cacheKey = `${title}-${year || ''}`;
  if (archiveCache.has(cacheKey)) return archiveCache.get(cacheKey)!;

  try {
    const query = `title:("${title}") AND mediatype:(movies)`;
    const url = `${ARCHIVE_SEARCH_URL}?q=${encodeURIComponent(query)}&fl[]=identifier&fl[]=title&rows=3&output=json`;
        const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    const docs = data?.response?.docs || [];

    const match = docs.find((d: any) =>
      d.title?.toLowerCase().trim() === title.toLowerCase().trim()
    ) || docs[0];

    const identifier = match ? match.identifier : null;
    archiveCache.set(cacheKey, identifier);
    return identifier;
  } catch {
    archiveCache.set(cacheKey, null);
    return null;
  }
}

export function getArchiveEmbedUrl(archiveId: string): string {
  return `https://archive.org/embed/${archiveId}`;
}

