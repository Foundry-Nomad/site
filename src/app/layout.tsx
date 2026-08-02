import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const hasValidGtmId = /^GTM-[A-Z0-9]+$/i.test(gtmId ?? "");

export const metadata: Metadata = {
  title: "Foundry Nomad — Coming Soon",
  description:
    "We are building the next generation of financial technology. Launching soon.",
  icons: {
    icon: [{ url: "/logo_128.png", type: "image/png", sizes: "128x128" }],
    shortcut: "/logo_128.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {hasValidGtmId && <GoogleTagManager gtmId={gtmId!} />}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
