import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/auth/AppProviders";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verdant — AI Mock Interviews That Help You Get Interview-Ready",
  description:
    "Practice realistic AI mock interviews, get instant feedback, identify your weaknesses, and prepare with confidence for your next interview.",
  openGraph: {
    title: "Verdant — AI Mock Interviews That Help You Get Interview-Ready",
    description:
      "Practice realistic AI mock interviews, get instant feedback, identify your weaknesses, and prepare with confidence for your next interview.",
    type: "website",
    siteName: "Verdant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdant — AI Mock Interviews That Help You Get Interview-Ready",
    description:
      "Practice realistic AI mock interviews, get instant feedback, identify your weaknesses, and prepare with confidence for your next interview.",
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
        className={`${inter.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ToastProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </ToastProvider>
      </body>
    </html>
  );
}