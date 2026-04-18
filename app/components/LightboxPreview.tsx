"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function Icon({ name }: { name: "x" | "chevL" | "chevR" | "zoomIn" | "zoomOut" }) {
  const common = "h-5 w-5";
  if (name === "x")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (name === "chevL")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "chevR")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "zoomIn")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 8v6m-3-3h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export type LightboxPreviewItem = {
  src: string;
  alt?: string;
  title?: string;
};

export function LightboxPreview({
  items,
  activeIndex,
  onChangeIndex,
  onClose,
}: {
  items: LightboxPreviewItem[];
  activeIndex: number;
  onChangeIndex: (nextIndex: number) => void;
  onClose: () => void;
}) {
  const hasItems = items.length > 0;
  const safeIndex = hasItems ? ((activeIndex % items.length) + items.length) % items.length : 0;
  const active = hasItems ? items[safeIndex] : null;

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; has: boolean } | null>(null);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const [zoom, setZoom] = useState(1);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Save scroll position and prevent scrolling
    const scrollY = window.scrollY;
    const prev = document.documentElement.style.overflow;
    const prevPosition = document.documentElement.style.position;
    const prevTop = document.documentElement.style.top;
    
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.position = "fixed";
    document.documentElement.style.top = `-${scrollY}px`;
    document.documentElement.style.width = "100%";
    
    return () => {
      document.documentElement.style.overflow = prev;
      document.documentElement.style.position = prevPosition;
      document.documentElement.style.top = prevTop;
      document.documentElement.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") setZoom((z) => clamp(Number((z + 0.25).toFixed(2)), 1, 3));
      if (e.key === "-" || e.key === "_") setZoom((z) => clamp(Number((z - 0.25).toFixed(2)), 1, 3));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIndex, items.length]);

  useEffect(() => {
    setZoom(1);
    // Reset scroll position when image changes or modal opens
    // This MUST happen immediately to ensure image is visible at top
    const resetScroll = () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop = 0;
        imageContainerRef.current.scrollLeft = 0;
      }
    };
    // Reset immediately, then multiple times to catch any async rendering
    resetScroll();
    const timer1 = setTimeout(resetScroll, 0);
    const timer2 = setTimeout(resetScroll, 50);
    const timer3 = setTimeout(resetScroll, 100);
    const timer4 = setTimeout(resetScroll, 200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [safeIndex]);

  function prev() {
    if (!hasItems) return;
    onChangeIndex((safeIndex - 1 + items.length) % items.length);
  }

  function next() {
    if (!hasItems) return;
    onChangeIndex((safeIndex + 1) % items.length);
  }

  function close() {
    setClosing(true);
    window.setTimeout(() => onClose(), 190);
  }

  function onOverlayPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && (e.buttons ?? 0) !== 1) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, has: true };
  }

  function onOverlayPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const s = dragRef.current;
    dragRef.current = null;
    if (!s?.has) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0) prev();
      else next();
    }
  }

  function onOverlayWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (!hasItems) return;
    if (!e.ctrlKey && Math.abs(e.deltaY) < 12) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => clamp(Number((z + delta).toFixed(2)), 1, 3));
  }

  function touchDistance(t1: React.Touch, t2: React.Touch) {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  }

  function onOverlayTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasItems) return;
    if (e.touches.length === 1) {
      dragRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, has: true };
    } else if (e.touches.length === 2) {
      pinchRef.current = { dist: touchDistance(e.touches[0], e.touches[1]), zoom };
    }
  }

  function onOverlayTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasItems) return;
    if (e.touches.length === 2 && pinchRef.current) {
      const dist = touchDistance(e.touches[0], e.touches[1]);
      const ratio = dist / pinchRef.current.dist;
      const nextZoom = clamp(Number((pinchRef.current.zoom * ratio).toFixed(2)), 1, 3);
      setZoom(nextZoom);
    }
  }

  function onOverlayTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasItems) return;
    pinchRef.current = null;
    if (e.touches.length > 0) return;
    const s = dragRef.current;
    dragRef.current = null;
    const t = e.changedTouches[0];
    if (!s?.has || !t) return;
    const dx = t.clientX - s.startX;
    const dy = t.clientY - s.startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0) prev();
      else next();
    }
  }

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md",
        "transition-opacity duration-200",
        closing ? "opacity-0" : "opacity-100",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) close();
      }}
      onPointerDown={onOverlayPointerDown}
      onPointerUp={onOverlayPointerUp}
      onWheel={onOverlayWheel}
      onTouchStart={onOverlayTouchStart}
      onTouchMove={onOverlayTouchMove}
      onTouchEnd={onOverlayTouchEnd}
    >
      <div
        className={[
          "relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-zinc-950/60 ring-1 ring-white/10",
          "transition-transform duration-200 flex flex-col",
          closing ? "scale-[0.985]" : "scale-100",
        ].join(" ")}
      >
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Close preview"
          >
            <Icon name="x" />
          </button>
        </div>

        <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(Number((z - 0.25).toFixed(2)), 1, 3))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Zoom out"
          >
            <Icon name="zoomOut" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(Number((z + 0.25).toFixed(2)), 1, 3))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Zoom in"
          >
            <Icon name="zoomIn" />
          </button>
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
              aria-label="Previous photo"
            >
              <Icon name="chevL" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
              aria-label="Next photo"
            >
              <Icon name="chevR" />
            </button>
          </>
        ) : null}

        <div 
          ref={imageContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="flex justify-center p-4 sm:p-6 py-8">
            <div
              className="relative"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 140ms ease" }}
            >
              <Image
                src={active.src}
                alt={active.alt ?? active.title ?? "Preview"}
                width={1600}
                height={1600}
                sizes="90vw"
                priority
                className="max-h-[calc(90vh-140px)] max-w-full w-auto h-auto select-none rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/85">
          <div className="min-w-0">
            <div className="truncate font-semibold text-white">{active.title ?? active.alt ?? "Photo"}</div>
            <div className="truncate text-xs text-white/70">
              Photo · {safeIndex + 1}/{items.length}
            </div>
          </div>
          <div className="hidden text-xs text-white/60 sm:block">Swipe or use ← → · ESC to close · Pinch / scroll to zoom</div>
        </div>
      </div>
    </div>
  );
}


