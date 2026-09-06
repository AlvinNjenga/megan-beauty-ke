import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../public/fonts/inter-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = localFont({
  src: "../public/fonts/fraunces-regular.woff2",
  variable: "--font-fraunces",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Megan Beauty | Pure Glow",
  description: "Discover facial oils, beauty tools, and self-care collections at Megan Beauty.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} min-h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
