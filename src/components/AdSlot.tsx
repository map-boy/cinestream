import React, { useEffect, useRef } from 'react';

// Falls back to the build-time constant so the unit always renders with a
// valid publisher ID, matching the snippet in index.html and /ads.txt.
const ADSENSE_CLIENT =
  import.meta.env.VITE_ADSENSE_CLIENT_ID ||
  (typeof __ADSENSE_CLIENT_ID__ !== 'undefined' ? __ADSENSE_CLIENT_ID__ : '');

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, format = 'auto', className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.warn('AdSense not ready yet:', e);
    }
  }, []);

  if (!ADSENSE_CLIENT) return null;

  return (
    <div className={`w-full flex flex-col items-center my-6 ${className}`}>
      {/* AdSense requires paid placements to be clearly distinguishable from
          site content. "Advertisement" is one of the two labels Google allows. */}
      <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Advertisement</span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
