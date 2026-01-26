import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MathNav from "@/components/MathNav";
import MathCursor from "@/components/MathCursor";
import SmokeCursor from "@/components/SmokeCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akhil | Full Stack + AI Developer",
  description: "Portfolio of Akhil - Full Stack and AI Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white cursor-none`}
      >
        <SmokeCursor />
        <MathCursor />
        <MathNav />
        {children}
      </body>
    </html>
  );
}
