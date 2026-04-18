'use client';

/**
 * Previously delayed showing the whole site for ~3.5s (opacity/translate),
 * which felt like periodic reloads or blank flashes when combined with navigation
 * or remounts. Content now renders immediately.
 */
export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

