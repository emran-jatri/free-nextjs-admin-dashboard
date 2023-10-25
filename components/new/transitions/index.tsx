import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

const variants = {
  start: { opacity: 0, x: 0, y: -100 },
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

export const ScrollYProgress = ({ style }: { style: any }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-3 bg-primary origin-[0%] z-999999"
      style={{ ...style }}
    />
  );
};
