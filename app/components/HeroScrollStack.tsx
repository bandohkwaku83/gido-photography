'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const slides = [
  {
    id: 1,
    image: '/images/hero/GIDO00934-min.JPG',
    title: "Capturing Life's",
    subtitle: 'Beautiful Moments',
    description: 'Professional photography that tells your story with elegance and artistry',
  },
  {
    id: 2,
    image: '/images/hero/GIDO0575-min.JPG',
    title: 'Wedding Photography',
    subtitle: 'Unforgettable Memories',
    description: 'Capture your special day with timeless elegance and beautiful storytelling',
  },
  {
    id: 3,
    image: '/images/hero/GIDO0920 2-min.jpg',
    title: 'Portrait Sessions',
    subtitle: 'Express Your Story',
    description: 'Professional portraits that reveal your unique personality and style',
  },
  {
    id: 4,
    image: '/images/hero/GIDO93960-min.jpg',
    title: 'Event Photography',
    subtitle: 'Capture Every Moment',
    description: 'Document your events with professional photography that tells the complete story',
  },
  {
    id: 5,
    image: '/images/hero/GIDO9956-1-min.JPG',
    title: 'Studio Photography',
    subtitle: 'Professional Excellence',
    description: 'Create stunning images in our professional studio with perfect lighting and composition',
  },
  {
    id: 6,
    image: '/images/hero/IMG_0932-min.JPG',
    title: 'Brand Photography',
    subtitle: 'Elevate Your Brand',
    description: 'Professional brand photography that showcases your products and services beautifully',
  },
];

export default function HeroScrollStack() {
  return (
    <section className="relative min-h-screen">
      <ScrollStack>
        {slides.map((slide) => (
          <ScrollStackItem key={slide.id}>
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={slide.id === 1}
                loading={slide.id <= 2 ? undefined : 'lazy'}
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
            </div>
            <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slide.title}
                {slide.subtitle && (
                  <>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {slide.subtitle}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/ratecard"
                  className="px-5 py-2.5 text-sm bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">View Rates</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  href="/contact-us"
                  className="px-5 py-2.5 text-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-95 hover:shadow-xl group relative overflow-hidden"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Scroll to next section"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
