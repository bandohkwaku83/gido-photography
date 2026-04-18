'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/** Bounce-in when scrolled into view (GSAP elastic) */
export function BounceIn({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { scale: 0.5, opacity: 0 });
      gsap.to(ref.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Click spark burst – visible particle burst on click */
export function ClickSparkWrap({
  children,
  sparkColor = '#fff',
}: {
  children: React.ReactNode;
  sparkColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = ref.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 35 + Math.random() * 40;
      const size = 6 + Math.random() * 4;
      p.style.cssText = `
        position: absolute; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px;
        border-radius: 50%; background: ${sparkColor}; pointer-events: none;
        transform: translate(-50%, -50%); box-shadow: 0 0 8px ${sparkColor};
      `;
      container.style.position = 'relative';
      container.appendChild(p);
      gsap.to(p, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: 0.7,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      });
    }
  };

  return (
    <div ref={ref} onClick={handleClick} style={{ display: 'inline-block', position: 'relative' }}>
      {children}
    </div>
  );
}
