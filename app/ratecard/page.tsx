'use client';

import Navigation from '../components/Navigation';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from '../components/ScrollAnimation';
import FloatingElements from '../components/FloatingElements';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';

const galleryImages = [
  '/images/about/GIDO00224-min.JPG',
  '/images/about/GIDO01015-min.JPG',
  '/images/about/GIDO0132-min.JPG',
  '/images/about/GIDO0288-min-min.jpg',
  '/images/about/GIDO8554-min.jpg',
  '/images/about/GIDO9915-min.JPG',
  '/images/about/GIDO9956-min.JPG',
  '/images/about/GIDO997213-min.JPG',
  '/images/about/IMG_0041-min.JPG',
  '/images/about/IMG_0092-min.JPG',
  '/images/about/IMG_0257-min.JPG',
  '/images/about/IMG_1932-min.JPG',
  '/images/about/IMG_4070-min.JPG',
  '/images/about/RICH1870-min.JPG',
  '/images/about/_IDO0339-min-min.jpg',
  '/images/about/_IDO0651-min.JPG',
];

export default function Ratecard() {
  const weddingPackages = [
    {
      name: 'AWARE',
      tier: 'PREMIUM',
      totalPrice: 'GHC 25,500.00',
      photographyPrice: 'GHC 15,500.00',
      videographyPrice: 'GHC 8,000.00',
      color: 'from-purple-500 via-pink-500 to-red-500',
      bgGradient: 'from-purple-50/50 via-pink-50/30 to-red-50/50',
      borderGradient: 'from-purple-400/50 via-pink-400/50 to-red-400/50',
      icon: '💎',
      image: '/images/wedding_card/_IDO9328-min.jpg',
      popular: true,
      photography: {
        features: [
          'Pre-wedding Shoot (30 images, 15 retouched, 2 hours session)',
          'Photography Coverage',
          'Bride and Groom Dress up',
          'Traditional & White wedding',
          'Exclusive and Reception images',
          '500 Images (30 Retouched) + All unprocessed jpegs (min. 600 images)',
          'Online Gallery',
          'Photobook (250 maximum)',
          '3 Photo frames (A2)',
          'Thank You Flyer after event',
          '360 Photo Booth',
          '1-hour Consultation',
          '8 Working Hours',
        ],
      },
      videography: {
        features: [
          'Videography Coverage',
          'Drone Coverage',
          'Bride and Groom dress up',
          'Video Trailer',
          'Traditional or white wedding and Reception Coverage',
          'Full Length Video (Approximately 1hr 30 mins)',
          'All softcopies on Pendrive',
          '8 Working Hours',
        ],
      },
      team: 'One Creative Director, Two Photographers, Two Videographers, One Assistant, One Drone Pilot, One 360 photobooth Master',
    },
    {
      name: 'DELUXE',
      tier: 'WEDDING',
      totalPrice: 'GHC 14,000.00',
      photographyPrice: 'GHC 9,000.00',
      videographyPrice: 'GHC 5,000.00',
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-50/50 via-indigo-50/30 to-purple-50/50',
      borderGradient: 'from-blue-400/50 via-indigo-400/50 to-purple-400/50',
      icon: '✨',
      image: '/images/wedding_card/GIDO0125-min.jpg',
      photography: {
        features: [
          'Pre-wedding Shoot (20 images, 10 retouched, 1 hour session, 2 outfits)',
          'Photography Coverage',
          'Bride and Groom Dress up',
          'Traditional or White wedding',
          'Exclusive and Reception images',
          '6 Working Hours',
          '200 Images (20 Retouched) + All unprocessed jpegs (min. 600 images)',
          'Photobook (250 maximum)',
          '2 Photo frames (A3)',
          'Thank You Flyer after event (within a day or two)',
          '1-hour Consultation',
        ],
      },
      videography: {
        features: [
          'Videography Coverage',
          'Drone Coverage',
          'Bride and Groom dress up',
          'Video Trailer (60 sec min)',
          '(Traditional or white wedding) Reception Coverage',
          'Full Length Video (Approximately 1hr 30 mins)',
          'All softcopies on Pendrive',
          '6 Working Hours',
        ],
      },
      team: 'Two Photographer, Two Videographer, One Assistant',
    },
    {
      name: 'PLATINUM',
      tier: 'WEDDING',
      totalPrice: 'GHC 11,000.00',
      photographyPrice: 'GHC 7,000.00',
      videographyPrice: 'GHC 4,000.00',
      color: 'from-slate-400 via-gray-500 to-slate-600',
      bgGradient: 'from-slate-50/50 via-gray-50/30 to-slate-50/50',
      borderGradient: 'from-slate-400/50 via-gray-400/50 to-slate-400/50',
      icon: '🌟',
      image: '/images/wedding_card/GIDO8898-min.JPG',
      photography: {
        features: [
          'Pre-wedding Shoot (10 retouched, 45 minutes session, 1 outfit)',
          'Photography Coverage',
          'Bride Dress up',
          'Traditional or White wedding',
          'With or without Reception images',
          '6 Working Hours',
          '200 Images (20 Retouched) + All unprocessed jpegs (min. 400 images)',
          '2 Photo Frame (A3)',
          'Thank You Flyer after event (within a day or two)',
          '45-Minutes Consultation',
        ],
      },
      videography: {
        features: [
          'Videography Coverage',
          'Full Length Video (Approximately 1hr 30 mins)',
          'Trailer video (60 sec min)',
          'Pendrive for all copies',
          '6 Working Hours',
        ],
      },
      team: 'Two Photographer, Two Videographer, One Assistant',
    },
    {
      name: 'BASIC',
      tier: 'WEDDING',
      totalPrice: 'GHC 8,500.00',
      photographyPrice: 'GHC 5,500.00',
      videographyPrice: 'GHC 3,000.00',
      color: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-50/50 via-orange-50/30 to-red-50/50',
      borderGradient: 'from-amber-400/50 via-orange-400/50 to-red-400/50',
      icon: '📸',
      image: '/images/wedding_card/GIDO9862-min.JPG',
      photography: {
        features: [
          'Photography Coverage',
          'Bride Dress up',
          'Exclusive images',
          'Unlimited Softcopies (10 Retouched)',
          '6 Working Hours',
        ],
      },
      videography: {
        features: [
          'Videography Coverage',
          'Trailer (60sec min)',
          'Full Length Video (Approximately 1hr)',
          '6 Working Hours',
        ],
      },
      team: 'One Photographer, One Videographer, One Assistant',
    },
    {
      name: 'STUDIO',
      tier: 'STUDIO',
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-50/50 via-teal-50/30 to-cyan-50/50',
      borderGradient: 'from-emerald-400/50 via-teal-400/50 to-cyan-400/50',
      icon: '🎬',
      image: '/images/studio_card/GIDO0057-min.JPG',
      hideDetails: true,
      detailsUrl: 'https://new.express.adobe.com/webpage/nl57SMirmjIqc',
      photography: { features: [] },
      videography: { features: [] },
      team: '',
    },
    {
      name: 'OUTDOOR',
      tier: 'OUTDOOR',
      color: 'from-amber-500 via-lime-500 to-green-500',
      bgGradient: 'from-amber-50/50 via-lime-50/30 to-green-50/50',
      borderGradient: 'from-amber-400/50 via-lime-400/50 to-green-400/50',
      icon: '🌿',
      image: '/images/outdoor_cards/IMG_0048-min.JPG',
      hideDetails: true,
      detailsUrl: 'https://new.express.adobe.com/webpage/nl57SMirmjIqc',
      photography: { features: [] },
      videography: { features: [] },
      team: '',
    },
  ];

  const WeddingPackageCard = ({ pkg, index }: { pkg: any; index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 150);
          }
        },
        { threshold: 0.2 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [index]);

    return (
      <div
        ref={cardRef}
        className={`relative group transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Popular Badge */}
        {pkg.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
              ⭐ PREMIUM PACKAGE
            </div>
          </div>
        )}

        <div
          className={`relative h-full bg-gradient-to-br ${pkg.bgGradient} dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 
          backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50
          shadow-lg hover:shadow-xl transition-shadow duration-300
          ${pkg.popular ? 'ring-2 ring-purple-400/50' : ''}`}
        >
          {/* Image Section */}
          <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
            {/* Tier Badge */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                {pkg.tier}
              </div>
            </div>
            {/* Icon Overlay */}
            <div className="absolute bottom-4 left-4 z-20 text-4xl">
              {pkg.icon}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Package Name */}
            <div>
              <h3
                className="text-xl font-black text-black dark:text-white mb-2"
              >
                {pkg.name} PACKAGE
              </h3>
            </div>

            {/* Pricing & Team — external link */}
            <a
              href={pkg.detailsUrl ?? 'https://new.express.adobe.com/webpage/IaDWjfuySl13t'}
              className="block w-full text-center py-3 px-4 rounded-lg text-sm font-semibold
                text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100
                bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60
                underline underline-offset-4 decoration-dotted
                transition-colors duration-300"
            >
              View pricing &amp; team details →
            </a>

            {/* Toggle Details Button */}
            {!pkg.hideDetails && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full py-2 px-4 rounded-lg font-semibold text-sm
                  bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white
                  shadow-md hover:shadow-lg
                  transition-shadow duration-300"
              >
                {showDetails ? 'Hide Details' : 'View Full Details'}
              </button>
            )}

            {/* Expandable Details */}
            {!pkg.hideDetails && showDetails && (
              <div className="space-y-4 pt-2 animate-fade-in">
                {/* Photography Section */}
                <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-4">
                  <h4 className="text-sm font-bold mb-3 text-black dark:text-white">
                    📸 PHOTOGRAPHY
                  </h4>
                  <ul className="space-y-1.5">
                    {pkg.photography.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Videography Section */}
                <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-4">
                  <h4 className="text-sm font-bold mb-3 text-black dark:text-white">
                    🎥 VIDEOGRAPHY
                  </h4>
                  <ul className="space-y-1.5">
                    {pkg.videography.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <Link
              href="/booking"
              className="block w-full mt-4 py-3 px-6 rounded-xl font-bold text-center
                bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white
                shadow-lg hover:shadow-xl
                transition-shadow duration-300"
            >
              Book Now
            </Link>

            {/* Terms and Conditions Link */}
            <Link
              href="/terms?tab=wedding"
              className="block w-full mt-3 text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline transition-colors duration-300"
            >
              Read our terms and conditions
            </Link>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 relative overflow-hidden">
      <Navigation />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 sm:px-8 lg:px-12 min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop"
            alt="Ratecard"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollAnimation animationType="zoom">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 relative inline-block">
              <span className="relative z-10">Ratecard</span>
              <span className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl animate-pulse"></span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-up" delay={200}>
            <p className="text-lg sm:text-xl text-gray-200 mb-4">
              Get to know the price packages we offer
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Packages Content — wedding only (studio/outdoor tabs removed) */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 relative min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 animate-fade-in">
              <ScrollAnimation animationType="fade-up">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 relative inline-block">
                    <span className="text-black dark:text-white">
                      Our Packages
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse" />
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Complete photography and videography coverage packages for every occasion
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {weddingPackages.map((pkg, index) => (
                  <WeddingPackageCard key={`wedding-${pkg.name}`} pkg={pkg} index={index} />
                ))}
              </div>

              <ScrollAnimation animationType="fade-up" delay={400}>
                <div className="mt-12 max-w-2xl mx-auto text-center p-6 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Note:</strong> All wedding packages cover one event day. For two-day events (for example, engagement and wedding on separate days), an additional 35% is added to the selected package. For the Basic package, the additional charge is 45% for two-day events.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Accommodation and transportation are provided by the client.
                  </p>
                </div>
              </ScrollAnimation>

              {/* Important Notes */}
              <ScrollAnimation animationType="fade-up" delay={400}>
                <div className="mt-16 max-w-5xl mx-auto">
                  <div className="bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-red-50/50 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-red-950/30 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-purple-200/50 dark:border-purple-800/50 shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
                      Important Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Retouching</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              All pictures are normally edited. Retouching focuses on specific elements for a glowing effect.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Delivery</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Final works delivery within 2-8 working weeks. Photo books handled by third party.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 4a2 2 0 00-2 2v1.16l.879.701A1 1 0 004 6.236V6h14v1.176a1 1 0 00.879.701L20 7.16V6a2 2 0 00-2-2H4zM2 9v6a2 2 0 002 2h14a2 2 0 002-2V9H2zm1 2h14v4H3v-4z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Payment</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              50% deposit to secure date. Remaining 50% due day before or on event date.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
        </div>
      </section>

      {/* Animated Image Gallery Section */}
      <section className="py-6 sm:py-8 relative overflow-hidden">
        <div className="relative">
          {/* Infinite Scroll Container */}
          <div className="flex gap-0 animate-scroll">
            {/* First Set */}
            {galleryImages.map((image, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-[200px] h-[250px] sm:w-[250px] sm:h-[300px] overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate Set for Seamless Loop */}
            {galleryImages.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-[200px] h-[250px] sm:w-[250px] sm:h-[300px] overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
