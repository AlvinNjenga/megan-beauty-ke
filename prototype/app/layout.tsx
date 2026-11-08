import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { StoreProvider, StoreShell } from "../components/store";
export const metadata: Metadata = {
  icons: { icon: "/images/mb-logo-white.png" },
  title: "Megan Beauty | A little beauty. A little sparkle.",
  description:
    "Explore the Megan Beauty design prototype. Beauty, jewellery and the little things that make a look yours.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          <StoreShell>{children}</StoreShell>
        </StoreProvider>
      </body>
    </html>
  );
}
