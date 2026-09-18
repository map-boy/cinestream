import React, { useEffect, useRef } from 'react';

/**
 * A single display ad unit.
 *
 * Ad units are only rendered when a real slot ID has been configured for the
 * placement. Every slot ID in an AdSense account is created in the account
 * itself, so before approval none exist: emitting <ins> tags with invented slot
 * IDs produces units that can never fill, which reads as incomplete ad code and
 * leaves blank gaps in the page. The loader script in index.html is always
 * present, which is what site verification and Auto ads need.
 *
 * To turn manual units on after approval, create the units in AdSense and set
 * VITE_AD_SLOTS to a comma-separated list of placement:slotId pairs, e.g.
 *   VITE_AD_SLOTS=home-mid:1234567890,article-inline:0987654321
 */
export type AdPlacement =
  | 'home-mid'
  | 'home-footer'
  | 'blog-index'
  | 'article-inline'
  | 'article-end';

const ADSENSE_CLIENT =
  import.meta.env.VITE_ADSENSE_CLIENT_ID ||
  (typeof __ADSENSE_CLIENT_ID__ !== 'undefined' ? __ADSENSE_CLIENT_ID__ : '');

/** Parses "placement:slotId,placement:slotId" into a lookup. */
const SLOT_IDS: Partial<Record<AdPlacement, string>> = (import.meta.env.VITE_AD_SLOTS || '')
  .split(',')
  .reduce((acc: Record<string, string>, pair: string) => {
    const [placement, slotId] = pair.split(':').map((part) => part.trim());
    if (placement && /^\d+$/.test(slotId || '')) acc[placement] = slotId;
    return acc;
  }, {});

interface AdSlotProps {
  placement: AdPlacement;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, format = 'auto', className = '' }) => {
  const slotId = SLOT_IDS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slotId || pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.warn('AdSense not ready yet:', e);
    }
  }, [slotId]);

  if (!ADSENSE_CLIENT || !slotId) return null;

  return (
    <div className={`w-full flex flex-col items-center my-6 ${className}`}>
      {/* AdSense requires paid placements to be clearly distinguishable from
          site content. "Advertisement" is one of the two labels Google allows. */}
      <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
