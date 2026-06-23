import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  speed?: number; // 1 (slowest, ~3.0s) to 30 (fastest, ~190ms)
}

export default function CountUp({ end, suffix = '', speed = 15 }: CountUpProps) {
  const [count, setCount] = useState(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Map speed (1-30) to animation duration.
          // speed 1 = 3000ms, speed 30 = 200ms
          const duration = Math.max(200, 3000 - ((speed - 1) * 96));
          const startTime = performance.now();
          const startValue = 1;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(startValue + easeProgress * (end - startValue));

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, end, speed]);

  return (
    <span ref={elementRef} className="tabular-nums font-semibold tracking-tight text-[#005fa9]">
      {count}
      {suffix}
    </span>
  );
}
