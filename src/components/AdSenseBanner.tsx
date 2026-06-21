import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  className?: string;
}

export default function AdSenseBanner({ className = '' }: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Prevent push blockages or pushing into unmounted nodes.
    // In React SPAs, when navigating away and coming back, push needs to be invoked.
    if (adRef.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense ad push failed:', err);
      }
    }
  }, []);

  return (
    <div className={`w-full my-6 flex justify-center mx-auto overflow-hidden min-h-[90px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', width: '100%' }}
        data-ad-client="ca-pub-7129893260461064"
        data-ad-slot="6804257666"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
