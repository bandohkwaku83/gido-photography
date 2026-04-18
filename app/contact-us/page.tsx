'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const contactMethods = [
  {
    label: 'Email',
    value: 'gidowilly1@gmail.com',
    href: 'mailto:gidowilly1@gmail.com',
    hint: 'Best for detailed enquiries and attachments',
    icon: EmailIcon,
    iconWrap:
      'bg-sky-100 text-sky-600 ring-1 ring-sky-200/80 dark:bg-sky-950/60 dark:text-sky-400 dark:ring-sky-800/80',
  },
  {
    label: 'Phone',
    value: '024 793 8292',
    href: 'tel:+233247938292',
    secondary: { value: '053 005 3337', href: 'tel:+233530053337' },
    hint: 'Weekdays, 9:00–18:00 GMT',
    icon: PhoneIcon,
    iconWrap:
      'bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-800/80',
  },
  {
    label: 'Studio',
    value: 'Accra, Ghana',
    hint: 'On-location and destination work by arrangement',
    icon: LocationIcon,
    iconWrap:
      'bg-rose-100 text-rose-600 ring-1 ring-rose-200/80 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-800/80',
  },
] as const;

const socialLinks = [
  {
    name: 'Weddings & Vows',
    subtitle: '@weddings_n_vows',
    href: 'https://www.instagram.com/weddings_n_vows/',
    network: 'instagram' as const,
  },
  {
    name: 'Gido Photography',
    subtitle: '@gido_photography',
    href: 'https://www.instagram.com/gido_photography/',
    network: 'instagram' as const,
  },
  {
    name: 'TikTok',
    subtitle: '@weddings_n_vows',
    href: 'https://www.tiktok.com/@weddings_n_vows?_r=1&_t=ZM-928FgsWHAca',
    network: 'tiktok' as const,
  },
] as const;

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <Navigation />

      <header className="relative border-b border-stone-200/80 dark:border-stone-800">
        <div className="absolute inset-0 min-h-[42vh] sm:min-h-[46vh]">
          <Image
            src="https://gidophotography-images.s3.us-east-1.amazonaws.com/website-media/appnet-04.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/80 dark:bg-black/85" aria-hidden />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-20 sm:pt-32 sm:pb-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl mx-auto">
            Let&apos;s start a conversation about your photography needs
          </p>
        </div>
      </header>

      <main className="relative px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                How to reach us
              </h2>

              <ul className="space-y-3">
                {contactMethods.map((item) => {
                  const Icon = item.icon;
                  return (
                  <li
                    key={item.label}
                    className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 shadow-sm"
                  >
                    <div className="flex gap-4 p-5 sm:p-6">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconWrap}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                          {item.label}
                        </p>
                        {'href' in item && item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block text-base font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors break-words"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-base font-medium text-stone-900 dark:text-stone-100">
                            {item.value}
                          </p>
                        )}
                        {'secondary' in item && item.secondary ? (
                          <a
                            href={item.secondary.href}
                            className="mt-1 block text-base font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                          >
                            {item.secondary.value}
                          </a>
                        ) : null}
                        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                          {item.hint}
                        </p>
                      </div>
                    </div>
                  </li>
                  );
                })}
              </ul>

              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  Social &amp; portfolio
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                  Recent work and updates — follow along if you&apos;d like to see more before you book.
                </p>
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/80 px-4 py-3 text-left transition-colors hover:border-stone-300 hover:bg-white dark:hover:border-stone-600 dark:hover:bg-stone-800/80 ${
                          s.network === 'instagram'
                            ? 'hover:border-pink-200 dark:hover:border-pink-900/50'
                            : 'hover:border-cyan-200/80 dark:hover:border-cyan-900/40'
                        }`}
                      >
                        {s.network === 'instagram' ? (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-sm ring-1 ring-white/20">
                            <InstagramGlyph className="h-6 w-6" />
                          </span>
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#010101] text-white shadow-sm ring-1 ring-white/15">
                            <TikTokGlyph className="h-6 w-6 text-white" />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                              {s.name}
                            </span>
                            <span className="text-stone-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                              ↗
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs text-stone-600 dark:text-stone-400">
                            {s.subtitle}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Ready to book?
                </h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Use the booking form to send your full brief we&apos;ll confirm details and pricing from there.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors text-center"
                  >
                    Book a session
                  </Link>
                  <Link
                    href="/ratecard"
                    className="inline-flex items-center justify-center rounded-lg border border-stone-300 dark:border-stone-600 px-5 py-3 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-center"
                  >
                    View ratecard
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-stone-300 dark:border-stone-600 bg-stone-100/50 dark:bg-stone-900/30 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1">
                  Response time
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  We aim to reply within one to two business days. If your date is soon, mention it in the subject
                  line or first message so we can prioritise.
                </p>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed px-1">
                By contacting us you agree to review our{' '}
                <Link href="/terms" className="underline underline-offset-2 hover:text-stone-800 dark:hover:text-stone-300">
                  terms &amp; conditions
                </Link>{' '}
                before confirming a booking.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
