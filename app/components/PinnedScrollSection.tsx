'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface PinnedScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Scroll distance (in px) the section stays pinned */
  pinDuration?: number;
  /** Inner content class */
  innerClassName?: string;
}

/**
 * Lando-style pinned section: section pins in view while you scroll through it,
 * then releases. Use for a quote or short story that reveals in steps.
 */
export function PinnedScrollSection({
  children,
  className = '',
  pinDuration = 1200,
  innerClassName = '',
}: PinnedScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const blocks = inner.querySelectorAll('[data-pinned-block]');
      if (!blocks.length) return;

      gsap.set(blocks, { opacity: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${pinDuration}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });
      tl.to(blocks, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.35,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef, dependencies: [pinDuration] }
  );

  return (
    <section ref={sectionRef} className={className}>
      <div ref={innerRef} className={`min-h-screen flex flex-col justify-center ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** Wrap each "step" of content inside PinnedScrollSection with this */
export function PinnedBlock({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-pinned-block className={className}>
      {children}
    </div>
  );
}
