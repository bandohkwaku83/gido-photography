/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type MasonryItem = {
  id: string;
  img: string;
  url?: string;
  height?: number; // Optional (not required when using natural image heights)
  title?: string;
};

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false, // Currently unused; kept for API parity
  className = '',
}: {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const easeFn = useMemo(() => {
    switch (ease) {
      case 'power3.out':
        return 'cubic-bezier(0.22, 1, 0.36, 1)';
      case 'power4.out':
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
      default:
        return 'ease-out';
    }
  }, [ease]);

  const durationMs = Math.max(0, duration) * 1000;
  const staggerMs = Math.max(0, stagger) * 1000;
  const blurPx = 10;

  useEffect(() => {
    if (!items.length) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const next: Record<string, boolean> = {};
      for (const item of items) next[item.id] = true;
      setVisibleMap(next);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).dataset.itemId;
          if (!id) return;

          setVisibleMap((prev) => {
            if (prev[id]) return prev;
            return { ...prev, [id]: true };
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // Intentionally depend on array length instead of identity.
  }, [items.length, animateFrom, blurToFocus, durationMs, staggerMs]);

  return (
    <div className={`masonry ${className}`}>
      {items.map((item, index) => {
        const isVisible = !!visibleMap[item.id];
        const isHover = hoveredId === item.id;
        const itemHeight = typeof item.height === 'number' ? item.height : undefined;

        const translateX =
          animateFrom === 'left' ? -18 : animateFrom === 'right' ? 18 : 0;
        const translateY =
          animateFrom === 'top' ? -18 : animateFrom === 'bottom' ? 18 : 0;

        const revealTransform = isVisible
          ? 'translate3d(0px, 0px, 0px)'
          : `translate3d(${translateX}px, ${translateY}px, 0px)`;

        const blurFilter = blurToFocus
          ? isVisible
            ? 'blur(0px)'
            : `blur(${blurPx}px)`
          : 'none';

        const hoverTransform =
          scaleOnHover && isHover ? `scale(${hoverScale})` : 'scale(1)';

        const delay = `${index * staggerMs}ms`;

        return (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={item.id || String(index)}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            data-item-id={item.id}
            className="masonry-item group relative mb-4 w-full overflow-hidden rounded-2xl cursor-pointer break-inside-avoid bg-white/75 shadow-sm ring-1 ring-inset ring-zinc-200 backdrop-blur transition hover:shadow-md dark:bg-zinc-900/50 dark:ring-white/10"
            style={{
              transform: revealTransform,
              transition: `transform ${durationMs}ms ${easeFn}`,
              transitionDelay: delay,
            }}
            aria-label={item.title ? `Open: ${item.title}` : 'Open preview'}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
            onClick={() => {
              if (!item.url) return;
              router.push(item.url);
            }}
          >
            <div
              className="relative w-full"
              style={itemHeight ? { height: `${itemHeight}px` } : undefined}
            >
              <div
                className="transition-[transform,filter] h-full overflow-hidden"
                style={{
                  filter: blurFilter,
                  transform: hoverTransform,
                  transitionDuration: `${durationMs}ms`,
                  transitionTimingFunction: easeFn,
                  transitionDelay: isVisible ? '0ms' : delay,
                }}
              >
                {/* Using <img> so masonry can rely on natural image heights */}
                <img
                  src={item.img}
                  alt={item.title ?? 'Featured work'}
                  loading="lazy"
                  decoding="async"
                  className={
                    itemHeight
                      ? 'h-full w-full select-none object-cover'
                      : 'h-auto w-full select-none object-cover'
                  }
                  style={itemHeight ? { height: '100%' } : undefined}
                />
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/50 rounded-2xl transition-all duration-500" />
            </div>
          </button>
        );
      })}
    </div>
  );
}

