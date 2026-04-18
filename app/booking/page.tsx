'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import ScrollAnimation from '../components/ScrollAnimation';
import FloatingElements from '../components/FloatingElements';
import Footer from '../components/Footer';

export default function Booking() {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    contact: '',
    email: '',
    serviceType: '',
    country: '',
    dateOfShoot: '',
    howDidYouKnow: '',
    whatDrawsYou: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your booking inquiry! We will get back to you soon.',
      });
      setFormData({
        fullName: '',
        role: '',
        contact: '',
        email: '',
        serviceType: '',
        country: '',
        dateOfShoot: '',
        howDidYouKnow: '',
        whatDrawsYou: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <Navigation />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 sm:px-8 lg:px-12 min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact.jpg"
            alt="Booking"
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
              <span className="relative z-10">Inquiry/Booking Form</span>
              <span className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl animate-pulse"></span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-up" delay={200}>
            <p className="text-lg text-gray-200">
              Let&apos;s capture your special moments together
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimation animationType="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 relative inline-block text-center">
              <span className="relative z-10">Book Your Session</span>
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse" />
            </h2>
          </ScrollAnimation>

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}
            >
              <p className="font-semibold">{submitStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="w-full">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                YOUR FULL NAME *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Role */}
            <div className="w-full relative">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                WHAT&apos;S YOUR ROLE *
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3.5 pr-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select your role</option>
                <option value="Bride" className="text-gray-900 dark:text-gray-100">Bride</option>
                <option value="Groom" className="text-gray-900 dark:text-gray-100">Groom</option>
                <option value="Couple" className="text-gray-900 dark:text-gray-100">Couple</option>
                <option value="Client" className="text-gray-900 dark:text-gray-100">Client</option>
                <option value="Other" className="text-gray-900 dark:text-gray-100">Other</option>
              </select>
              <div className="absolute right-3 top-[42px] pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Contact */}
            <div className="w-full">
              <label htmlFor="contact" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                CONTACT *
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200"
                placeholder="+1234567890"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Kindly include country code.
              </p>
            </div>

            {/* Email Address */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* Service Type */}
            <div className="w-full relative">
              <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                WHAT KIND OF SERVICE ARE YOU BOOKING? *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3.5 pr-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select option</option>
                <option value="Wedding Photography" className="text-gray-900 dark:text-gray-100">Wedding Photography</option>
                <option value="Wedding Videography" className="text-gray-900 dark:text-gray-100">Wedding Videography</option>
                <option value="Wedding Photography & Videography" className="text-gray-900 dark:text-gray-100">Wedding Photography & Videography</option>
                <option value="Portrait Session" className="text-gray-900 dark:text-gray-100">Portrait Session</option>
                <option value="Studio Session" className="text-gray-900 dark:text-gray-100">Studio Session</option>
                <option value="Birthday Photography" className="text-gray-900 dark:text-gray-100">Birthday Photography</option>
                <option value="Brand/Commercial Photography" className="text-gray-900 dark:text-gray-100">Brand/Commercial Photography</option>
                <option value="Event Photography" className="text-gray-900 dark:text-gray-100">Event Photography</option>
                <option value="Other" className="text-gray-900 dark:text-gray-100">Other</option>
              </select>
              <div className="absolute right-3 top-[42px] pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Country */}
            <div className="w-full relative">
              <label htmlFor="country" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                COUNTRY (WHERE SERVICE IS NEEDED) *
              </label>
              <select
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3.5 pr-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select option</option>
                <option value="Ghana" className="text-gray-900 dark:text-gray-100">Ghana</option>
                <option value="Nigeria" className="text-gray-900 dark:text-gray-100">Nigeria</option>
                <option value="United States" className="text-gray-900 dark:text-gray-100">United States</option>
                <option value="United Kingdom" className="text-gray-900 dark:text-gray-100">United Kingdom</option>
                <option value="Canada" className="text-gray-900 dark:text-gray-100">Canada</option>
                <option value="Other" className="text-gray-900 dark:text-gray-100">Other</option>
              </select>
              <div className="absolute right-3 top-[42px] pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                We are able to travel anywhere in the world aside from the above-mentioned where we have branches.
              </p>
            </div>

            {/* Date of Shoot/Event */}
            <div className="w-full">
              <label htmlFor="dateOfShoot" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                DATE OF SHOOT/EVENT *
              </label>
              <input
                type="text"
                id="dateOfShoot"
                name="dateOfShoot"
                required
                value={formData.dateOfShoot}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200"
                placeholder="22/02/20 and 23/02/20"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Day/Month/Year<br />
                If events are on two or three different days, kindly list all dates.<br />
                If uncertain about your date, kindly name a tentative month and indicate that it&apos;s pending.
              </p>
            </div>

            {/* How Did You Know About Us */}
            <div className="w-full relative">
              <label htmlFor="howDidYouKnow" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                HOW DID YOU KNOW ABOUT US? *
              </label>
              <select
                id="howDidYouKnow"
                name="howDidYouKnow"
                required
                value={formData.howDidYouKnow}
                onChange={handleChange}
                className="w-full px-4 py-3.5 pr-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select option</option>
                <option value="Instagram" className="text-gray-900 dark:text-gray-100">Instagram</option>
                <option value="Facebook" className="text-gray-900 dark:text-gray-100">Facebook</option>
                <option value="TikTok" className="text-gray-900 dark:text-gray-100">TikTok</option>
                <option value="Referral from friend/family" className="text-gray-900 dark:text-gray-100">Referral from friend/family</option>
                <option value="Google Search" className="text-gray-900 dark:text-gray-100">Google Search</option>
                <option value="Previous client" className="text-gray-900 dark:text-gray-100">Previous client</option>
                <option value="Other" className="text-gray-900 dark:text-gray-100">Other</option>
              </select>
              <div className="absolute right-3 top-[42px] pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* What Draws You to Our Work */}
            <div className="w-full">
              <label htmlFor="whatDrawsYou" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                WHAT DRAWS YOU TO OUR WORK *
              </label>
              <textarea
                id="whatDrawsYou"
                name="whatDrawsYou"
                required
                rows={5}
                value={formData.whatDrawsYou}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transform focus:scale-[1.02] transition-all duration-200 resize-none"
                placeholder="Tell us what draws you to our work..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Booking Inquiry'
              )}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

