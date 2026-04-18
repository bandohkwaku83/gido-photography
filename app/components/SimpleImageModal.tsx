"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function SimpleImageModal({
  src,
  alt,
  title,
  onClose,
  open,
}: {
  src: string;
  alt?: string;
  title?: string;
  onClose: () => void;
  open: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Lock body scroll when modal opens
    const scrollY = window.scrollY;
    const prev = document.documentElement.style.overflow;
    const prevPosition = document.documentElement.style.position;
    const prevTop = document.documentElement.style.top;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.position = "fixed";
    document.documentElement.style.top = `-${scrollY}px`;
    document.documentElement.style.width = "100%";

    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.documentElement.style.overflow = prev;
      document.documentElement.style.position = prevPosition;
      document.documentElement.style.top = prevTop;
      document.documentElement.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Image modal"
    >
      <div className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-8 h-8"
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
        <Image
          src={src}
          alt={alt ?? title ?? "Image"}
          width={1600}
          height={1600}
          sizes="90vw"
          priority
          className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
            <p className="text-sm font-medium text-center">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
