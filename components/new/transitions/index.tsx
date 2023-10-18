import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  start: { opacity: 0, x: 0, y: -500 },
  stop: { opacity: 1, x: 0, y: 0 },
};

export default function FramerMotion({
  variantsData = variants,
  transition,
  children,
}: {
  variantsData?: any;
  transition?: any;
  children: React.ReactNode;
}) {
  return (
    // <AnimatePresence>
    <motion.div
      // layout
      variants={variantsData}
      initial="start"
      animate="stop"
      transition={{ ...transition, ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
    // </AnimatePresence>
  );
}
