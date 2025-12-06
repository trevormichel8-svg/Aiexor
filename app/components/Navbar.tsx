"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-semibold tracking-[0.55em] gradient-gold glow-animate">
          A I E X O R
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
          <Link href="#overview">Overview</Link>
          <Link href="#use-cases">Use Cases</Link>
          <Link href="#why-it-works">Why It Works</Link>
          <Link href="#transfer">Transfer</Link>
          <Link href="#offer">Make Offer</Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-neutral-200"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
