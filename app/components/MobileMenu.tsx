"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50"
        >
          <div className="absolute right-0 top-0 h-full w-64 glass p-6 flex flex-col gap-6">
            <button
              onClick={onClose}
              className="self-end text-neutral-300 text-xl"
            >
              ✕
            </button>

            <Link href="#overview" onClick={onClose}>Overview</Link>
            <Link href="#use-cases" onClick={onClose}>Use Cases</Link>
            <Link href="#why-it-works" onClick={onClose}>Why It Works</Link>
            <Link href="#transfer" onClick={onClose}>Transfer</Link>
            <Link href="#offer" onClick={onClose}>Make Offer</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
                 }
            
