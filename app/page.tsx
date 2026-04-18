'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import ScrollAnimation from './components/ScrollAnimation';
import FloatingElements from './components/FloatingElements';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import { BounceIn, ClickSparkWrap } from './components/AnimationEffects';
import { TextReveal } from './components/TextReveal';
import Masonry from './Masonry';
import { useEffect, useState, useMemo } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Featured works (shuffled) - keep image and height paired
  const featuredPairs = useMemo(
    () => [
      { img: '/images/featured/IMG_7390-min.JPG', height: 650 },
      { img: '/images/featured/_IDO0978-min.jpg', height: 640 },
      { img: '/images/featured/IMG_4307-min.JPG', height: 590 },
      { img: '/images/featured/IMG_5891-min.jpg', height: 260 },
      { img: '/images/featured/GIDO8960.JPG', height: 280 },
      { img: '/images/featured/GIDO8549-1-min.jpg', height: 400 },
      { img: '/images/featured/GIDO_7785-min.JPG', height: 600 },
      { img: '/images/featured/IMG_4244-min.JPG', height: 610 },
      { img: '/images/featured/IMG_3150-min.JPG', height: 560 },
      { img: '/images/featured/GIDO0231-1.JPG', height: 520 },
      { img: '/images/featured/IMG_4306-min.JPG', height: 330 },
      { img: '/images/featured/IMG_0089-min.JPG', height: 310 },
      { img: '/images/featured/GIDO00281-min.JPG', height: 380 },
      { img: '/images/featured/IMG_4149-min.JPG', height: 240 },
      { img: '/images/featured/IMG_1736-min.JPG', height: 250 },
    ],
    []
  );

  const featuredPreviewImagesParam = useMemo(
    () => encodeURIComponent(JSON.stringify(featuredPairs.map((p) => p.img))),
    [featuredPairs]
  );

  const featuredItems = useMemo(() => {
    return featuredPairs.map((pair, index) => {
      const params = new URLSearchParams({
        images: featuredPreviewImagesParam,
        index: index.toString(),
        title: `Featured ${index + 1}`,
      });

      return {
        id: `${index + 1}`,
        img: pair.img,
        url: `/preview?${params.toString()}`,
        height: pair.height,
        title: `Featured ${index + 1}`,
      };
    });
  }, [featuredPairs, featuredPreviewImagesParam]);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden scroll-smooth snap-y snap-proximity">
      <Navigation />
      <FloatingElements />
      
      {/* Mouse follower effect */}
      <div 
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Hero – slide show */}
      <HeroSlider />

      {/* Branding Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white dark:bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-1 lg:gap-2">
            
            {/* Left Section - Wedding Logo */}
            <ScrollAnimation animationType="fade-left" delay={0}>
              <div className="flex items-center justify-center md:justify-start flex-1 min-h-[120px]">
                <Image 
                  src="/images/weddings.png" 
                  alt="Weddings n Vows" 
                  width={300}
                  height={150}
                  className="w-full max-w-xs md:max-w-full h-auto object-contain"
                  style={{ maxHeight: '150px' }}
                  priority
                />
              </div>
            </ScrollAnimation>

            {/* Left Divider */}
            <div className="hidden md:block w-px h-20 bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>

            {/* Middle Section - Text */}
            <ScrollAnimation animationType="zoom" delay={100}>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-0">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-serif italic text-black dark:text-white mb-0.5" 
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}
                >
                  Gido Photography
                </h2>
                <p className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 font-sans tracking-wide uppercase">
                  Commercial Photographer & Videographer
                </p>
              </div>
            </ScrollAnimation>

            {/* Right Divider */}
            <div className="hidden md:block w-px h-20 bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>

            {/* Right Section - Gido Logo */}
            <ScrollAnimation animationType="fade-right" delay={200}>
              <div className="flex items-center justify-center md:justify-end flex-1 min-h-[120px]">
                <Image 
                  src="/images/gido_photo.png" 
                  alt="Gido Photography" 
                  width={300}
                  height={100}
                  className="w-full max-w-xs md:max-w-full h-auto object-contain"
                  style={{ maxHeight: '150px' }}
                  priority
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section - Masonry Layout */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <ScrollAnimation animationType="zoom">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 relative inline-block">
                <span className="relative z-10">Featured Work</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse"></span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
                A glimpse into our portfolio
              </p>
            </div>
          </ScrollAnimation>

          {/* Featured Works Masonry */}
          <Masonry
            items={featuredItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollAnimation animationType="zoom">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 relative inline-block">
                <span className="relative z-10">Client Reviews</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse"></span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
                What our clients say about us
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* Review Card */}
            <ScrollAnimation animationType="fade-up" delay={0}>
              <div className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl rounded-xl p-3 md:p-4 border border-white/20 dark:border-gray-700/50 shadow-md">
                
                {/* Quote Icon */}
                <div className="absolute top-3 right-3 opacity-10">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-xs relative z-10">
                    "Gido!! Gido!! I'm alive!!..! Where do I even start? From our lateness to the pre-wedding shot, to your drip for the traditional and your steeze for the wedding!! My oh my! I remember telling my sister and the glam team that if you do not go ahead with the shoot, I won't be surprised because we were fashionably late, but no way. You were ever so calm, bubbly, and receptive. Right there, I was so certain I got the right man. Director 1, thank you for pulling up for us in several ways, God bless you. You and your team will go far, Kojo, and I know this because of how you value people and not just your work, which is outstanding. Cheers to more gigs and kokotii vibes. Thank you, Kwame, for blinding me all the time too. I thought you were my favourite one on the team until I met baby police. Such a humble soul. You have an incredible team, and you all are what a couple need on their day. Let's set a fufu date asap aloo, you're not alive? Lots of love,"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                        TE
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white text-xs">Tee & Ernest</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">Wedding Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Brands We've Worked With Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animationType="zoom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 relative inline-block">
                <span className="relative z-10">Brands We've Worked With</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse"></span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Trusted by leading brands and organizations
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center">
            {[
              { src: '/images/brands/b1.jpg', alt: 'Brand 1', delay: 0 },
              { src: '/images/brands/b2.png', alt: 'Brand 2', delay: 100 },
              { src: '/images/brands/b3.png', alt: 'Brand 3', delay: 200 },
            ].map((brand, index) => (
              <ScrollAnimation key={index} animationType="fade-up" delay={brand.delay}>
                <div 
                  className="flex items-center justify-center p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-shake w-full max-w-[200px] h-[150px] md:h-[180px]" 
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={200}
                    height={180}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Life's Beauty Philosophy Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Title – word-by-word reveal */}
          <div className="mb-12 md:mb-16">
            <TextReveal
              text="Life's Beauty"
              as="h2"
              splitBy="words"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white text-center"
              stagger={0.12}
              start="top 78%"
            />
          </div>

          {/* Philosophy Text */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20">
            <ScrollAnimation animationType="fade-left" delay={100}>
              <div className="flex items-center gap-3">
                <span className="text-white text-2xl">*</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white uppercase tracking-wide">
                  Quote
                </h3>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animationType="fade-right" delay={200}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed max-w-4xl">
                Journeying Together: Where Passionate Vision Meets Exquisite Craftsmanship, Weaving Tales of Emotion, Joy, and Connection.
              </p>
            </ScrollAnimation>
          </div>

          {/* Images Grid */}
          <div className="relative mt-12 md:mt-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {[
                { src: '/images/GIDO9183.JPG', alt: 'About', delay: 300 },
                { src: '/images/GIDO0029.JPG', alt: 'Contact', delay: 400 },
              ].map((img, index) => (
                <ScrollAnimation key={index} animationType="fade-up" delay={img.delay}>
                  <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] group">
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-700 group-hover:scale-105">
                      <Image 
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 md:bottom-12 right-4 md:right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 md:p-2.5 transition-all duration-300 hover:scale-110 shadow-lg border border-white/30"
          aria-label="Scroll to top"
        >
          <ClickSparkWrap sparkColor="#fafafa">
            <span className="block p-1">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </span>
          </ClickSparkWrap>
        </button>
      )}

      <Footer />
    </div>
  );
}