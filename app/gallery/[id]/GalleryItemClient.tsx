"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { MediaItem } from "../../components/demoMedia";

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

export function GalleryItemClient({ id, items }: { id: string; items: MediaItem[] }) {
  const router = useRouter();

  const idx = useMemo(() => items.findIndex((x) => x.id === id), [id, items]);
  const activeIdx = idx === -1 ? 0 : idx;
  const active = items[activeIdx];

  const [zoom, setZoom] = useState(1);
  const dragRef = useRef<{ startX: number; startY: number; has: boolean } | null>(null);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const prevId = items.length ? items[(activeIdx - 1 + items.length) % items.length]?.id : undefined;
  const nextId = items.length ? items[(activeIdx + 1) % items.length]?.id : undefined;

  // Reset zoom when switching item
  useEffect(() => setZoom(1), [activeIdx]);

  // Keyboard: ESC closes (back to /gallery), arrows navigate, +/- zoom
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/gallery");
      if (e.key === "ArrowLeft" && prevId) router.push(`/gallery/${prevId}`);
      if (e.key === "ArrowRight" && nextId) router.push(`/gallery/${nextId}`);
      if (e.key === "+" || e.key === "=") setZoom((z) => clamp(Number((z + 0.25).toFixed(2)), 1, 3));
      if (e.key === "-" || e.key === "_") setZoom((z) => clamp(Number((z - 0.25).toFixed(2)), 1, 3));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextId, prevId, router]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && (e.buttons ?? 0) !== 1) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, has: true };
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const s = dragRef.current;
    dragRef.current = null;
    if (!s?.has) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0 && prevId) router.push(`/gallery/${prevId}`);
      else if (dx < 0 && nextId) router.push(`/gallery/${nextId}`);
    }
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
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

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches.length === 1) {
      dragRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, has: true };
    } else if (e.touches.length === 2) {
      pinchRef.current = { dist: touchDistance(e.touches[0], e.touches[1]), zoom };
    }
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches.length === 2 && pinchRef.current) {
      const dist = touchDistance(e.touches[0], e.touches[1]);
      const ratio = dist / pinchRef.current.dist;
      const nextZoom = clamp(Number((pinchRef.current.zoom * ratio).toFixed(2)), 1, 3);
      setZoom(nextZoom);
    }
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    pinchRef.current = null;
    if (e.touches.length > 0) return;
    const s = dragRef.current;
    dragRef.current = null;
    const t = e.changedTouches[0];
    if (!s?.has || !t) return;
    const dx = t.clientX - s.startX;
    const dy = t.clientY - s.startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx > 0 && prevId) router.push(`/gallery/${prevId}`);
      else if (dx < 0 && nextId) router.push(`/gallery/${nextId}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black text-white">
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{active?.title ?? "Preview"}</div>
          <div className="truncate text-xs text-white/70">
            {active?.kind === "video" ? "Video" : "Photo"} · {activeIdx + 1}/{items.length}
          </div>
        </div>

        <div className="flex items-center gap-2">
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
          <Link
            href="/gallery"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Back to gallery"
          >
            <Icon name="x" />
          </Link>
        </div>
      </div>

      {/* Nav arrows */}
      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => prevId && router.push(`/gallery/${prevId}`)}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Previous"
          >
            <Icon name="chevL" />
          </button>
          <button
            type="button"
            onClick={() => nextId && router.push(`/gallery/${nextId}`)}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/15"
            aria-label="Next"
          >
            <Icon name="chevR" />
          </button>
        </>
      ) : null}

      {/* Viewer (fixed to viewport) */}
      <div
        className="absolute inset-0 pt-[64px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
          <div
            className="relative"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 140ms ease" }}
          >
            {active?.kind === "video" ? (
              <video
                src={active.src}
                poster={active.poster}
                controls
                playsInline
                className="max-h-[calc(100vh-110px)] w-auto select-none rounded-xl object-contain"
              />
            ) : (
              <Image
                src={active?.src ?? ""}
                alt={active?.title ?? "Preview"}
                width={active?.width ?? 1600}
                height={active?.height ?? 1067}
                priority
                unoptimized
                className="max-h-[calc(100vh-110px)] w-auto select-none rounded-xl object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


