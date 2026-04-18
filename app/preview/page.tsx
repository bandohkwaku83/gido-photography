"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, Suspense } from "react";
import Navigation from "../components/Navigation";

const S3_BUCKET_HTTP_BASE = "https://gidophotography-images.s3.us-east-1.amazonaws.com";

function resolveImageSrc(src: string) {
  if (!src.startsWith("s3://")) return src;
  const s3Path = src.replace(/^s3:\/\/[^/]+\//, "");
  return `${S3_BUCKET_HTTP_BASE}/${s3Path.split("/").map(encodeURIComponent).join("/")}`;
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const src = searchParams.get("src");
  const title = searchParams.get("title") || undefined;
  const imagesParam = searchParams.get("images");
  const currentIndexParam = searchParams.get("index");

  // Parse images array from URL
  const images = useMemo(() => {
    if (imagesParam) {
      try {
        return JSON.parse(decodeURIComponent(imagesParam));
      } catch {
        return src ? [src] : [];
      }
    }
    return src ? [src] : [];
  }, [imagesParam, src]);

  const currentIndex = useMemo(() => {
    if (currentIndexParam) {
      const idx = parseInt(currentIndexParam, 10);
      return isNaN(idx) ? 0 : idx;
    }
    return 0;
  }, [currentIndexParam]);

  const currentImage = images[currentIndex] || src;
  const hasMultipleImages = images.length > 1;

  const goToNext = () => {
    if (hasMultipleImages) {
      const nextIndex = (currentIndex + 1) % images.length;
      updateUrl(images, nextIndex);
    }
  };

  const goToPrevious = () => {
    if (hasMultipleImages) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      updateUrl(images, prevIndex);
    }
  };

  const updateUrl = (imageList: string[], index: number) => {
    const params = new URLSearchParams({
      images: encodeURIComponent(JSON.stringify(imageList)),
      index: index.toString(),
      title: title || `Image ${index + 1}`,
    });
    router.replace(`/preview?${params.toString()}`);
  };

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      } else if (e.key === "ArrowLeft" && hasMultipleImages) {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateUrl(images, prevIndex);
      } else if (e.key === "ArrowRight" && hasMultipleImages) {
        const nextIndex = (currentIndex + 1) % images.length;
        updateUrl(images, nextIndex);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images, hasMultipleImages, router, title]);

  if (!currentImage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p>Image not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div 
        className="fixed inset-0 flex items-center justify-center pt-20 pb-4 px-4"
        onClick={(e) => {
          // Close when clicking on the background (not on the image itself)
          if (e.target === e.currentTarget) {
            router.back();
          }
        }}
      >
        {/* Close Button - positioned outside the image container */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.back();
          }}
          className="fixed top-24 right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/70 hover:bg-black/90 rounded-full p-3 shadow-lg"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div 
          className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Previous Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full p-3"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full p-3"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <Image
            src={resolveImageSrc(currentImage)}
            alt={title || `Image ${currentIndex + 1}`}
            width={1600}
            height={1600}
            sizes="90vw"
            priority
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
          
          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
            <p className="text-sm font-medium text-center">
              {title || `Image ${currentIndex + 1}`}
              {hasMultipleImages && (
                <span className="ml-2 text-xs text-gray-300">
                  ({currentIndex + 1} / {images.length})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
