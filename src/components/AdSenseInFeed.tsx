import React, { useEffect, useRef } from 'react';

interface AdSenseInFeedProps {
  className?: string;
}

export default function AdSenseInFeed({ className = '' }: AdSenseInFeedProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense in-feed ad push failed:', err);
      }
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden min-h-[250px] bg-slate-50 border border-slate-100 p-4 flex flex-col justify-center items-center ${className}`}>
      <div className="w-full text-[9px] font-bold text-slate-400 mb-2 uppercase tracking-wide text-center">
        Sponsored Feed
      </div>
      <div className="w-full">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-7129893260461064"
          data-ad-slot="5849278967"
        />
      </div>
    </div>
  );
}
