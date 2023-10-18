"use client";
import FramerMotion from "@/components/new/transitions";
import { AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        <FramerMotion
          variantsData={{
            start: { opacity: 0, x: 500, y: 0 },
            stop: { opacity: 1, x: 0, y: 0 },
          }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </FramerMotion>
      </AnimatePresence>
    </div>
  );
}
