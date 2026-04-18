'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom' | 'rotate' | 'slide-up';
  delay?: number;
}

const variants = {
  'fade-up': { y: 80, opacity: 0 },
  'fade-left': { x: -80, opacity: 0 },
  'fade-right': { x: 80, opacity: 0 },
  'zoom': { scale: 0.7, opacity: 0 },
  'rotate': { rotation: -12, opacity: 0 },
  'slide-up': { y: 100, opacity: 0 },
};

const toState = {
  'fade-up': { y: 0, opacity: 1 },
  'fade-left': { x: 0, opacity: 1 },
  'fade-right': { x: 0, opacity: 1 },
  'zoom': { scale: 1, opacity: 1 },
  'rotate': { rotation: 0, opacity: 1 },
  'slide-up': { y: 0, opacity: 1 },
};

export default function ScrollAnimation({
  children,
  className = '',
  animationType = 'fade-up',
  delay = 0,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const from = variants[animationType];
      const to = toState[animationType];
      gsap.set(ref.current, { ...from, force3D: true });
      gsap.to(ref.current, {
        ...to,
        duration: 1.1,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref, dependencies: [animationType, delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
