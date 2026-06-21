import React, { useEffect, useRef } from 'react';

interface AdSenseMultiplexProps {
  className?: string;
}

export default function AdSenseMultiplex({ className = '' }: AdSenseMultiplexProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense multiplex ad push failed:', err);
      }
    }
  }, []);

  return (
    <div className={`w-full my-8 flex justify-center mx-auto overflow-hidden min-h-[250px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-7129893260461064"
        data-ad-slot="8475442300"
        data-ad-format="autorelaxed"
      />
    </div>
  );
}
