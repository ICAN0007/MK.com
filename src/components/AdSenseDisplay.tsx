import React, { useEffect, useRef } from 'react';

interface AdSenseDisplayProps {
  className?: string;
  slot?: string;
  adFormat?: string;
}

export default function AdSenseDisplay({ 
  className = '', 
  slot = '6804257666', // Use the user's primary display / horizontal ad slot
  adFormat = 'auto'    // "auto" makes it automatically responsive for any layout
}: AdSenseDisplayProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense display ad push failed:', err);
      }
    }
  }, [slot, adFormat]);

  return (
    <div className={`w-full overflow-hidden flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-4 transition-all duration-200 ${className}`}>
      <span className="text-[9px] font-bold text-slate-400 mb-2 uppercase tracking-widest text-center block">
        Advertisement
      </span>
      <div className="w-full flex justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minWidth: '250px' }}
          data-ad-client="ca-pub-7129893260461064"
          data-ad-slot={slot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
