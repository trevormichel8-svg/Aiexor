import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function MotionCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="glass p-6 rounded-xl border border-white/10"
      whileHover={{ y: -6, boxShadow: "0 0 30px rgba(255,230,160,0.2)" }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
      }

