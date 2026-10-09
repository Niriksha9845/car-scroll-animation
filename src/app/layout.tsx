import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W E L C O M E I T Z F I Z Z | Scroll-Driven Hero Animation",
  description:
    "Exact recreation of the ITZFIZZ scroll-driven car animation using Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
