"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MediaItem } from "./demoMedia";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-revealed");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "80px 0px 80px 0px" },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);
}

function Icon({ name }: { name: "search" | "x" | "chevL" | "chevR" | "zoomIn" | "zoomOut" }) {
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
  if (name === "zoomOut")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Gallery({ items }: { items: MediaItem[] }) {
  useRevealOnScroll();

  const shuffled = useMemo(() => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [items]);

  const photos = useMemo(() => shuffled.filter((m) => m.kind === "image"), [shuffled]);
  const videos = useMemo(() => shuffled.filter((m) => m.kind === "video"), [shuffled]);
  const heroMain = photos[0] ?? null;
  const heroSideA = photos[1] ?? null;
  const heroSideB = photos[2] ?? null;

  return (
    <div className="romantic-pattern romantic-grain relative min-h-screen overflow-x-hidden text-zinc-900 dark:text-zinc-50">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-400/25 blur-3xl dark:bg-rose-400/18" />
        <div className="absolute right-[-70px] top-28 h-96 w-96 rounded-full bg-pink-300/22 blur-3xl dark:bg-pink-300/14" />
        <div className="absolute bottom-[-90px] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-200/18 blur-3xl dark:bg-amber-200/10" />
        <div className="bubbles">
          <div className="bubble left-[10%] top-[110%] h-12 w-12 [--dur:18s] [--wob:6s] [--delay:-2s] [--wiggle:14px] [--s:1]" />
          <div className="bubble left-[22%] top-[120%] h-20 w-20 [--dur:22s] [--wob:7s] [--delay:-10s] [--wiggle:-18px] [--s:1.1]" />
          <div className="bubble left-[40%] top-[112%] h-10 w-10 [--dur:16s] [--wob:5.5s] [--delay:-6s] [--wiggle:10px] [--s:0.95]" />
          <div className="bubble left-[62%] top-[125%] h-24 w-24 [--dur:26s] [--wob:8s] [--delay:-14s] [--wiggle:22px] [--s:1.15]" />
          <div className="bubble left-[78%] top-[118%] h-14 w-14 [--dur:20s] [--wob:6.5s] [--delay:-4s] [--wiggle:-16px] [--s:1.02]" />
          <div className="bubble left-[90%] top-[130%] h-9 w-9 [--dur:15s] [--wob:5s] [--delay:-9s] [--wiggle:12px] [--s:0.9]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5 reveal" data-reveal style={{ ["--reveal-delay" as never]: "0ms" }}>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                For you, <span className="text-zinc-500 dark:text-zinc-300">always</span>.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Tap any photo to open it full-screen, swipe through memories, and pinch/scroll to zoom.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-900/40 dark:ring-white/10">
                  Tip: press <span className="font-medium">ESC</span> to close
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-900/40 dark:ring-white/10">
                  Use <span className="font-medium">← →</span> to navigate
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 reveal" data-reveal style={{ ["--reveal-delay" as never]: "90ms" }}>
              {heroMain ? (
                <div className="rounded-3xl bg-white/60 p-2 shadow-sm ring-1 ring-inset ring-zinc-200 backdrop-blur dark:bg-zinc-900/35 dark:ring-white/10">
                  <div className="grid gap-2 sm:grid-cols-5">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="group relative overflow-hidden rounded-2xl sm:col-span-3"
                      aria-label="Open featured photo"
                    >
                      <Link href={`/gallery/${heroMain.id}`} aria-label="Open featured photo" className="absolute inset-0 z-10" />
                      <Image
                        src={heroMain.src}
                        alt={heroMain.title}
                        width={heroMain.width}
                        height={heroMain.height}
                        unoptimized
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                        className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[360px] lg:h-[420px]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
                        <div className="text-lg font-semibold text-white">{heroMain.title}</div>
                        <div className="mt-1 text-xs text-white/80">Featured</div>
                      </div>
                    </button>

                    <div className="grid gap-2 sm:col-span-2">
                      {heroSideA ? (
                        <button
                          type="button"
                          onClick={() => {}}
                          className="group relative overflow-hidden rounded-2xl"
                          aria-label="Open photo"
                        >
                          <Link href={`/gallery/${heroSideA.id}`} aria-label="Open photo" className="absolute inset-0 z-10" />
                          <Image
                            src={heroSideA.src}
                            alt={heroSideA.title}
                            width={heroSideA.width}
                            height={heroSideA.height}
                            unoptimized
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 420px"
                            className="h-[156px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[176px] lg:h-[206px]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0 opacity-90" />
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                            <div className="truncate text-sm font-semibold text-white">{heroSideA.title}</div>
                          </div>
                        </button>
                      ) : null}

                      {heroSideB ? (
                        <button
                          type="button"
                          onClick={() => {}}
                          className="group relative overflow-hidden rounded-2xl"
                          aria-label="Open photo"
                        >
                          <Link href={`/gallery/${heroSideB.id}`} aria-label="Open photo" className="absolute inset-0 z-10" />
                          <Image
                            src={heroSideB.src}
                            alt={heroSideB.title}
                            width={heroSideB.width}
                            height={heroSideB.height}
                            unoptimized
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 420px"
                            className="h-[156px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[176px] lg:h-[206px]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0 opacity-90" />
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                            <div className="truncate text-sm font-semibold text-white">{heroSideB.title}</div>
                          </div>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-200 bg-white/70 p-10 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900/40 dark:text-zinc-300">
                  Add at least one image to show a hero.
                </div>
              )}
            </div>
          </div>
        </header>

        <section aria-label="Photos">
          <div
            className="mb-4 flex items-end justify-between gap-3 reveal"
            data-reveal
            style={{ ["--reveal-delay" as never]: "0ms" }}
          >
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Photos</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">A quiet grid of little chapters.</p>
            </div>
          </div>
          {photos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white/70 p-10 text-center text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900/40 dark:text-zinc-300">
              No media yet. Add photos/videos under <span className="font-mono">public/media/</span> and update{" "}
              <span className="font-mono">app/components/demoMedia.ts</span>.
            </div>
          ) : (
            <div className="rounded-3xl bg-white/45 p-2 ring-1 ring-inset ring-zinc-200 backdrop-blur dark:bg-zinc-900/25 dark:ring-white/10">
              <div className="masonry">
                {photos.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className="masonry-item group relative mb-4 w-full overflow-hidden rounded-2xl bg-white/75 shadow-sm ring-1 ring-inset ring-zinc-200 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/50 dark:ring-white/10 reveal"
                    onClick={() => {}}
                    data-reveal
                    style={{ ["--reveal-delay" as never]: `${Math.min(idx * 35, 260)}ms` }}
                  >
                    <Link href={`/gallery/${p.id}`} aria-label={`Open ${p.title}`} className="absolute inset-0 z-10" />
                    <div className="relative w-full">
                      <Image
                        src={p.src}
                        alt={p.title}
                        width={p.width}
                        height={p.height}
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-auto w-full select-none object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-white">{p.title}</div>
                            <div className="mt-0.5 text-xs text-white/80">Photo</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {videos.length ? (
          <section aria-label="Videos" className="mt-12">
            <div
              className="mb-4 flex items-end justify-between gap-3 reveal"
              data-reveal
              style={{ ["--reveal-delay" as never]: "0ms" }}
            >
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Videos</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Little moments in motion.</p>
              </div>
            </div>

            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
              {videos.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {}}
                  className="group relative w-[78vw] max-w-[520px] snap-start overflow-hidden rounded-3xl bg-white/75 shadow-sm ring-1 ring-inset ring-zinc-200 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/50 dark:ring-white/10 sm:w-[420px] reveal"
                  aria-label={`Open video: ${v.title}`}
                  data-reveal
                  style={{ ["--reveal-delay" as never]: `${Math.min(idx * 60, 240)}ms` }}
                >
                  <Link href={`/gallery/${v.id}`} aria-label={`Open video: ${v.title}`} className="absolute inset-0 z-10" />
                  <div className="relative">
                    <video
                      src={v.src}
                      poster={v.poster}
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="metadata"
                      className="h-[260px] w-full object-cover sm:h-[280px]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-sm font-semibold text-white">{v.title}</div>
                      <div className="mt-1 text-xs text-white/80">Video</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}


