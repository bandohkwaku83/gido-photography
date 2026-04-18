"use client";

import Navigation from "../components/Navigation";
import FloatingElements from "../components/FloatingElements";
import Footer from "../components/Footer";
import { Gallery } from "../components/Gallery";
import { demoMedia } from "../components/demoMedia";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <Navigation />
      <FloatingElements />
      <Gallery items={demoMedia} />
      <Footer />
    </div>
  );
}


