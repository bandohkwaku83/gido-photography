'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function TermsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'portrait' | 'wedding'>('portrait');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'wedding') {
      setActiveTab('wedding');
    } else {
      setActiveTab('portrait');
    }
  }, [searchParams]);

  const portraitTerms = [
    'A 50% deposit is required to secure the booking date. The remaining balance is payable on the day of the shoot.',
    'You must not post or share our unedited preview photos publicly (including social media) without our prior approval.',
    'We do not offer refunds.',
    'Raw/unprocessed files are not included. Requests for raw files may be approved at an additional fee.',
    'Home service bookings include an additional GHc 800 fee for transporting studio equipment.',
    'An additional GHc 200 may apply for brand shoots/extra services (e.g., hair and/or makeup).',
    'Rescheduling attracts an additional 50% of the selected package price (based on availability).',
    'Clients are responsible for all transportation costs related to the booking.',
    'Extra photo edits are charged at GHc 100 per additional edit.',
    'An additional GHc 200 applies for maternity photoshoots.',
    'Final results are delivered within 7 working days.',
    'Makeup at the studio attracts a GHc 100 fee.',
    'Hair styling at the studio attracts a GHc 100 fee.',
    'Adding another person attracts an additional fee of 50% of the selected package price; the number of pictures remains the same.',
    'Express delivery or special work attracts an additional GHc 400 fee.',
    'Receipts can be provided whenever a payment is made (by request).',
    'Late arrival on the day of the shoot may attract a GHc 100 penalty.',
    'Raw files are deleted one month after the shoot. Any additional edits should be discussed as early as possible.',
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <Navigation />

      <header className="relative pt-28 pb-20 px-6 sm:px-8 lg:px-12 border-b border-stone-200/80 dark:border-stone-800">
        <div className="absolute inset-0">
          <Image
            src="/images/legal.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/85 dark:bg-black/90" aria-hidden />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-300 mb-4">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Terms &amp; conditions
          </h1>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
            Please read these terms before booking. Policies differ for portrait sessions and wedding
            coverage; use the selector below to view the section that applies to you.
          </p>
        </div>
      </header>

      <main className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex p-1 mb-10 rounded-lg bg-stone-200/60 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700"
            role="tablist"
            aria-label="Terms category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'portrait'}
              onClick={() => setActiveTab('portrait')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'portrait'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200/80 dark:border-stone-700'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Portrait sessions
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'wedding'}
              onClick={() => setActiveTab('wedding')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'wedding'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200/80 dark:border-stone-700'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Wedding coverage
            </button>
          </div>

          {activeTab === 'portrait' && (
            <article
              role="tabpanel"
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 shadow-sm"
            >
              <div className="px-6 sm:px-8 py-8 sm:py-10 border-b border-stone-100 dark:border-stone-800">
                <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  Portrait terms
                </h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  The following applies to portrait and related studio or on-location sessions unless
                  otherwise agreed in writing.
                </p>
              </div>
              <ul className="px-6 sm:px-8 py-8 sm:py-10 space-y-4">
                {portraitTerms.map((term, index) => (
                  <li key={index} className="flex gap-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200/80 dark:bg-stone-800 text-xs font-semibold text-stone-600 dark:text-stone-400">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{term}</span>
                  </li>
                ))}
              </ul>
              <div className="px-6 sm:px-8 pb-8 sm:pb-10 space-y-6">
                <div className="rounded-lg border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 px-5 py-4">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    Acceptance
                  </p>
                  <p className="mt-2 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    Your booking confirms acceptance of these terms. You are welcome to review our
                    portrait work. We retain ownership of all images; unedited previews may only be
                    shared with our prior written approval. For questions, use the contact details in
                    the site footer.
                  </p>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-500 text-center leading-relaxed">
                  Making a part-payment or deposit means you have agreed to these terms and policies.
                </p>
              </div>
            </article>
          )}

          {activeTab === 'wedding' && (
            <article
              role="tabpanel"
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 shadow-sm"
            >
              <div className="px-6 sm:px-8 py-8 sm:py-10 border-b border-stone-100 dark:border-stone-800">
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                  Last updated: 22 February 2025
                </p>
                <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  Wedding terms
                </h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  Weddings_n_Vows — photography, videography, and related media services.
                </p>
              </div>

              <div className="px-6 sm:px-8 py-8 sm:py-10 space-y-8 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                <p>
                  Welcome to Weddings_n_Vows. We provide media coverage including photography,
                  videography, and digital marketing. These terms apply to all services we render. By
                  using our services, you confirm your acceptance and agree to be bound by them. If you
                  have any questions, please contact our team. If you do not agree with these terms,
                  please do not access or use our services.
                </p>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-3">
                    Payment &amp; refund policies
                  </h3>
                  <p>
                    A 50% deposit is required to secure or book your date. Payments can be made via bank
                    deposit or mobile money using details provided by our representative. The remaining
                    50% should be paid either one day before the event or on the day of the event. No
                    images, videos, or related deliverables will be released until full payment has been
                    received. We do not accept installment payments.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-3">
                    Cancellation
                  </h3>
                  <p>
                    Payments made are not refundable upon cancellation of a booking. If your event date
                    changes, we will reschedule to another available date provided you agree to pay an
                    additional 50% of the selected package price. In some cases, the amount paid may be
                    transferred to another client or converted into a voucher (same amount) for future
                    use, depending on availability. If we are unable to attend the event after a deposit
                    has been made, we will refund the full deposit amount. We are not responsible for
                    compensation in situations beyond our control.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-3">
                    Mode of work
                  </h3>
                  <p>
                    We work closely with clients to deliver the best results. For important segments
                    (such as bridal preparation, groom dress-up when applicable, and exclusive portraits),
                    we require sufficient time to capture quality coverage — typically at least 30 minutes
                    per segment. If schedule constraints prevent this, we may not capture all requested
                    shots and will not be held liable for missed segments. Booking with Weddings_n_Vows
                    means you have chosen our creative style; we deliver within the scope of what we offer.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-3">
                    Delivery of items
                  </h3>
                  <p className="mb-4">
                    <strong className="text-stone-900 dark:text-stone-100">Pre-wedding:</strong> A date
                    is selected in advance for the shoot at a location recommended or selected by the
                    client. If the location requires any cost (such as venue fees), the client is
                    responsible for those costs if agreed in advance. Watermarked raw images are shared
                    via cloud for you to select images included in your package. Final pre-wedding
                    images are delivered within 2–5 working days from the shoot date.
                  </p>
                  <p className="mb-4">
                    <strong className="text-stone-900 dark:text-stone-100">Event delivery:</strong> Photo
                    books, albums, and frames are handled by a third party. Delivery timelines depend on
                    when we receive finished products; delays may occur. Final delivery of event
                    photography and videography is estimated within 2–8 working weeks.
                  </p>
                  <ul className="space-y-3 list-disc pl-5 marker:text-stone-400">
                    <li>
                      Clients must ensure there is no harassment, intimidation, or disrespect toward any
                      representative of Weddings_n_Vows.
                    </li>
                    <li>
                      Additional requests outside the agreed items or invoice may incur extra costs
                      (subject to availability and scope).
                    </li>
                    <li>Meetings before the wedding (consultation) are fee-based.</li>
                    <li>Clients are responsible for all transportation costs involved.</li>
                    <li>
                      Attendance at wedding rehearsal may be fee-based and will be agreed between our
                      representative and the client.
                    </li>
                    <li>If accommodation is required, accommodation costs are the client&apos;s responsibility.</li>
                    <li>Clients are expected to ensure our representatives are adequately catered for while working.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-3">
                    Receipts
                  </h3>
                  <p>
                    A receipt is generated for each payment made toward an event (including full name,
                    event date, and event location). The receipt records the transaction details. Please
                    request a receipt when payment or a refund is made.
                  </p>
                </section>

                <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-5 py-4">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    Important notice
                  </p>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Deliverables, timelines, and additional charges may vary depending on your chosen
                    package and the agreed invoice. For clarifications, contact our team before the event.
                  </p>
                </div>

                <p className="pt-6 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-500">
                  © 2025 Weddings_n_Vows. All rights reserved.
                </p>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Terms() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col">
          <Navigation />
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="text-center">
              <div
                className="mx-auto h-8 w-8 rounded-full border-2 border-stone-300 border-t-stone-700 dark:border-stone-600 dark:border-t-stone-200 animate-spin"
                aria-hidden
              />
              <p className="mt-4 text-sm text-stone-600 dark:text-stone-400">Loading terms…</p>
            </div>
          </div>
        </div>
      }
    >
      <TermsContent />
    </Suspense>
  );
}
