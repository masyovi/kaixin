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
  title: "Kaixin — We build things that matter.",
  description:
    "Kaixin is a technology studio founded by Yovi Widianto. We design, engineer, and ship digital products that people actually want to use.",
  keywords: ["Kaixin", "startup", "technology", "Yovi Widianto", "digital products", "design studio"],
  authors: [{ name: "Yovi Widianto" }],
  icons: { icon: "/logo-kaixin.png" },
  openGraph: {
    title: "Kaixin — We build things that matter.",
    description: "A technology studio by Yovi Widianto.",
    type: "website",
    images: ["/logo-kaixin.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
