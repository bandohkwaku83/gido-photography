import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ContentWrapper from "./components/ContentWrapper";

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Gido Photography | Capturing Life's Beautiful Moments",
  description: "Professional photography services capturing life's most precious moments. Specializing in portraits, events, and artistic photography.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans antialiased`}
      >
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </body>
    </html>
  );
}
