'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 3 second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add delay before hiding to allow fade-out animation
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black dark:bg-white flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 dark:bg-black/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/10 dark:bg-black/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-white/10 dark:bg-black/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Brand logo */}
        <div className="mb-8 animate-fade-in-up">
          <Image
            src="/images/gid.png"
            alt="Gido Photography"
            width={200}
            height={80}
            className="w-auto h-auto max-w-[200px] sm:max-w-[250px] object-contain"
            priority
          />
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce animation-delay-300"></div>
        </div>

        {/* Loading text */}
        <p className="mt-6 text-white/70 dark:text-black/70 text-sm animate-fade-in-up animation-delay-200">
          Capturing Moments...
        </p>
      </div>
    </div>
  );
}

