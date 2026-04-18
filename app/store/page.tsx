'use client';

import Navigation from '../components/Navigation';
import Image from 'next/image';
import ScrollAnimation from '../components/ScrollAnimation';
import FloatingElements from '../components/FloatingElements';
import Footer from '../components/Footer';

export default function Store() {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <Navigation />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-6 sm:px-8 lg:px-12 min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop"
            alt="Store"
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
              <span className="relative z-10">Store</span>
              <span className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl animate-pulse"></span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-up" delay={200}>
            <p className="text-lg text-gray-200">
              Premium prints, albums, and digital products
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="pt-8 pb-32 px-6 sm:px-8 lg:px-12 relative min-h-[60vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation animationType="zoom" delay={100}>
            <div className="relative inline-block mb-8">
              <div className="relative w-full max-w-4xl mx-auto">
                <Image 
                  src="/images/coming_soon.png" 
                  alt="Coming Soon"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animationType="fade-up" delay={300}>
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're working hard to bring you an amazing collection of premium photography products.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animationType="fade-up" delay={500}>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
              Stay tuned for updates on our upcoming store featuring prints, albums, and digital products.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animationType="zoom" delay={700}>
            <div className="flex items-center justify-center gap-4 text-4xl">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}

