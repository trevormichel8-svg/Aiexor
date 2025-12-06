import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Section({
  id,
  children
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

