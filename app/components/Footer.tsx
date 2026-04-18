'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black border-t border-gray-800 dark:border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-block hover:scale-105 transition-transform">
              <Image
                src="/images/gid.png"
                alt="Gido Photography"
                width={150}
                height={60}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-gray-400 dark:text-gray-600 mb-4 max-w-md">
              Capturing life&apos;s most beautiful moments with professional photography services. 
              Specializing in portraits, events, and artistic photography.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/weddings_n_vows/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/20 transform hover:scale-110 transition-all"
                aria-label="Instagram - Weddings and Vows"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/gido_photography/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/20 transform hover:scale-110 transition-all"
                aria-label="Instagram - Gido Photography"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@weddings_n_vows?_r=1&_t=ZM-928FgsWHAca" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/20 transform hover:scale-110 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ratecard" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  Ratecard
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-600">
              <li className="hover:text-white dark:hover:text-black transition-colors">
                <a href="mailto:gidowilly1@gmail.com">gidowilly1@gmail.com</a>
              </li>
              <li>
                0247938292 | 0530053337
              </li>
              <li>
                Accra - Ghana
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 dark:border-gray-200 pt-8 text-center text-gray-400 dark:text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Gido Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

