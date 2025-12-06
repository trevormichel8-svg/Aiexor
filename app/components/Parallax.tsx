"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function Parallax({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-50, 50], [-3, 3]);

  return (
    <motion.div
      onMouseMove={(e) => x.set(e.clientX - window.innerWidth / 2)}
      style={{ rotate }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
      }

