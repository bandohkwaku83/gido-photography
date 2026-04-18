'use client';

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/10 dark:border-black/10 rounded-lg animate-float animation-delay-100"></div>
      <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white/10 dark:border-black/10 rounded-full animate-float animation-delay-300"></div>
      <div className="absolute bottom-40 left-1/4 w-12 h-12 border-2 border-white/10 dark:border-black/10 rotate-45 animate-spin-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-white/10 dark:border-black/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-14 h-14 border-2 border-white/10 dark:border-black/10 rounded-lg rotate-12 animate-float animation-delay-500"></div>
    </div>
  );
}

