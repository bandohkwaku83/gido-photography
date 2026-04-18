'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export interface CircularGalleryProps {
  /** Curvature strength: higher = more bent arc (e.g. 3–8) */
  bend?: number;
  /** Border radius as fraction of item size (0–1) */
  borderRadius?: number;
  /** Scroll speed multiplier */
  scrollSpeed?: number;
  /** Ease/lerp for smooth follow (0.02–0.1, lower = smoother) */
  scrollEase?: number;
  /** Text/label color */
  textColor?: string;
  /** Image URLs to show in the gallery */
  images?: string[];
  /** Optional height in px */
  height?: number;
  className?: string;
}

const DEFAULT_IMAGES = [
  '/images/featured/GIDO8549-1-min.jpg',
  '/images/featured/IMG_1736-min.JPG',
  '/images/featured/GIDO_7785-min.JPG',
  '/images/featured/GIDO00281-min.JPG',
  '/images/featured/GIDO0231-1.JPG',
  '/images/featured/GIDO8960.JPG',
  '/images/featured/_IDO0978-min.jpg',
  '/images/featured/IMG_0089-min.JPG',
  '/images/featured/IMG_3150-min.JPG',
  '/images/featured/IMG_4149-min.JPG',
];

export default function CircularGallery({
  bend = 6,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  textColor = '#ffffff',
  images = DEFAULT_IMAGES,
  height = 600,
  className = '',
}: CircularGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useRef(0);
  const targetOffset = useRef(0);
  const rafRef = useRef<number>(0);

  // Smooth scroll follow (scrollEase = lerp)
  useEffect(() => {
    const update = () => {
      targetOffset.current += (scrollOffset.current - targetOffset.current) * scrollEase;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${targetOffset.current}px)`;
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollEase]);

  // Wheel: move gallery (scroll down = slide left to show next images)
  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = 0;
      const min = -Math.max(0, (images.length - 2) * (260 + 24));
      scrollOffset.current = Math.min(max, Math.max(min, scrollOffset.current - e.deltaY * scrollSpeed));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [images.length, scrollSpeed]);

  const itemWidth = 260;
  const itemHeight = 340;
  const gap = 24;
  const totalWidth = images.length * (itemWidth + gap) - gap;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        height: `${height}px`,
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)',
      }}
    >
      <div
        ref={trackRef}
        className="flex items-end justify-center gap-6"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '50%',
          marginLeft: -totalWidth / 2,
          marginBottom: -itemHeight / 2,
          width: totalWidth,
          height: itemHeight,
          willChange: 'transform',
        }}
      >
        {images.map((src, i) => {
          const n = images.length;
          const t = (i / (n - 1 || 1)) * 2 - 1;
          const bendY = Math.pow(t, 2) * bend * 40;
          const scale = 1 - Math.abs(t) * 0.12;
          const zIndex = Math.round((1 - Math.abs(t)) * 100);
          const opacity = 0.6 + (1 - Math.abs(t)) * 0.4;
          const radius = Math.round(borderRadius * Math.min(itemWidth, itemHeight));
          return (
            <div
              key={`${src}-${i}`}
              className="flex-shrink-0 transition-shadow duration-300 hover:shadow-2xl"
              style={{
                width: itemWidth,
                height: itemHeight,
                transform: `translateY(${-bendY}px) scale(${scale})`,
                opacity,
                zIndex,
                borderRadius: `${radius}px`,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <Image
                src={src}
                alt=""
                width={itemWidth}
                height={itemHeight}
                sizes="260px"
                className="w-full h-full object-cover"
                style={{ borderRadius: `${radius}px` }}
              />
            </div>
          );
        })}
      </div>
      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] uppercase opacity-80"
        style={{ color: textColor }}
      >
        Scroll to explore
      </p>
    </div>
  );
}
