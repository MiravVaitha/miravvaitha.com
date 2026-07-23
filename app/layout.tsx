import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { BackgroundShader } from "@/components/ui/BackgroundShader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TopScrubber } from "@/components/ui/TopScrubber";
import { ScrollReveals } from "@/components/ui/ScrollReveals";

// Existing Geist locals stay (referenced as --font-geist-* in globals.css).
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// New fonts from next/font/google. Variable names match globals.css.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirav Vaitha",
  description:
    "Engineering @ Trinity College Dublin · SWE Intern @ Capventis · Based in Dublin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode="light"
      data-metaphor="medium"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>
        <BackgroundShader />
        <CustomCursor />
        <TopScrubber />
        <ScrollReveals />
        {children}
      </body>
    </html>
  );
}
