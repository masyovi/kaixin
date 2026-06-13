import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaixin - Innovation That Brings Happiness",
  description:
    "Kaixin is a modern technology startup founded by Yovi Widianto, dedicated to creating innovative solutions that bring joy and simplicity to people's lives through cutting-edge technology.",
  keywords: [
    "Kaixin",
    "startup",
    "technology",
    "innovation",
    "Yovi Widianto",
    "digital solutions",
    "software development",
  ],
  authors: [{ name: "Yovi Widianto" }],
  icons: {
    icon: "/logo-kaixin.png",
  },
  openGraph: {
    title: "Kaixin - Innovation That Brings Happiness",
    description:
      "Kaixin is a modern technology startup dedicated to creating innovative solutions that bring joy and simplicity to people's lives.",
    type: "website",
    images: ["/logo-kaixin.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaixin - Innovation That Brings Happiness",
    description:
      "A modern technology startup dedicated to creating innovative solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
