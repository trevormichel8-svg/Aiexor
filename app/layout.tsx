import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Aiexor.com — Premium Futuristic AI Brand",
  description:
    "Own Aiexor.com — a futuristic 6-letter AI brand with bold identity, perfect for SaaS, agents, LLM tools, automation platforms, or AI infrastructure brands.",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Aiexor.com — Premium AI Brand",
    description:
      "Own the premium AI brand Aiexor.com — powerful, futuristic, and made for next-generation AI products.",
    url: "https://aiexor.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aiexor — Premium AI Brand"
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#050505] text-neutral-100 antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
  }
