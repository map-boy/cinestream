export interface WikiSummary {
  extract: string;
  extractHtml: string;
  pageUrl: string;
  thumbnail?: string;
}

const wikiCache = new Map<string, WikiSummary | null>();

export async function getWikipediaSummary(
  title: string,
  year?: number
): Promise<WikiSummary | null> {
  const cacheKey = `${title}-${year || ''}`;
  if (wikiCache.has(cacheKey)) return wikiCache.get(cacheKey)!;

  const candidates = [
    `${title} (film)`,
    year ? `${title} (${year} film)` : null,
    title,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(candidate)}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) continue;
      const data = await res.json();

      if (data.extract && data.extract.length > 50) {
        const summary: WikiSummary = {
          extract: data.extract,
          extractHtml: data.extract_html || data.extract,
          pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(candidate)}`,
          thumbnail: data.thumbnail?.source,
        };
        wikiCache.set(cacheKey, summary);
        return summary;
      }
    } catch {
      continue;
    }
  }

  wikiCache.set(cacheKey, null);
  return null;
}
