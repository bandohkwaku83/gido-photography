'use client';

import {
  useRef,
  useEffect,
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

function ScrollStack({ children, className = '' }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const items = Children.toArray(children).filter(
    (child) =>
      isValidElement(child) &&
      (child.type === ScrollStackItem ||
        (child.type as { displayName?: string })?.displayName === 'ScrollStackItem')
  );

  const n = items.length;

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!container || !pin || cards.length === 0) return;

    // Stack: first card on top (highest z-index). Scroll = peel top card off (move up).
    gsap.set(cards, { y: 0, opacity: 1 });
    cards.forEach((card, i) => {
      gsap.set(card, { zIndex: n - i });
    });

    if (cards.length === 1) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${(n - 1) * window.innerHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    for (let i = 0; i < n - 1; i++) {
      tl.to(
        cards[i],
        {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        i
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, [n]);

  let cardIndex = 0;
  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: '100vh' }}
    >
      <div
        ref={pinRef}
        className="relative w-full"
        style={{ height: '100vh' }}
      >
        {Children.map(children, (child) => {
          if (
            !isValidElement(child) ||
            (child.type !== ScrollStackItem &&
              (child.type as { displayName?: string })?.displayName !== 'ScrollStackItem')
          ) {
            return child;
          }
          const stackChild = child as ReactElement<ScrollStackItemProps>;
          const i = cardIndex++;
          return (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ willChange: 'transform' }}
            >
              {stackChild.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScrollStackItem({ children, className = '' }: ScrollStackItemProps) {
  return (
    <div className={`h-full w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
ScrollStackItem.displayName = 'ScrollStackItem';

export default ScrollStack;
