import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

export default function GlowButton({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_0_20px_rgba(255,220,130,0.6)]"
      >
        {children}
      </Link>
    </motion.div>
  );
}

