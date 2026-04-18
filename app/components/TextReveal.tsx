'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type SplitBy = 'words' | 'chars' | 'lines';

interface TextRevealProps {
  text: string;
  splitBy?: SplitBy;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  start?: string;
}

function splitText(text: string, by: SplitBy): string[] {
  if (by === 'words') return text.trim().split(/\s+/).filter(Boolean);
  if (by === 'chars') return text.split('');
  return [text]; // lines would need line breaks in source
}

export function TextReveal({
  text,
  splitBy = 'words',
  className = '',
  delay = 0,
  stagger = 0.06,
  as: Tag = 'h2',
  start = 'top 82%',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parts = splitText(text, splitBy);

  useGSAP(
    () => {
      if (!ref.current) return;
      const els = ref.current.querySelectorAll('.reveal-part');
      if (!els.length) return;
      gsap.set(els, { y: '1.2em', opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref, dependencies: [text, splitBy] }
  );

  const isChars = splitBy === 'chars';
  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={className}>
        {parts.map((part, i) => (
          <span
            key={i}
            className="reveal-part inline-block overflow-hidden align-bottom leading-tight"
            style={{ verticalAlign: 'bottom' }}
          >
            <span className="inline-block" style={{ paddingBottom: isChars ? 0 : '0.15em' }}>
              {part}
              {splitBy === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
