"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  duration?: number;
}

const AnimatedText = ({ text, duration }: Props) => {
  return (
    <div>
      {text.split(/(?<=\s|\S)/u).map((char, index) => (
        <motion.span
          key={char + "-" + index}
          animate={{
            x: [0, 10, -10, 0].map((x) => (Math.random() - 0.5) * x * 50),
            y: [0, 10, -10, 0].map((y) => (Math.random() - 0.5) * y * 100),
            rotate: [0, 10, -10, 0].map((r) => (Math.random() - 0.5) * r * 100),
          }}
          transition={{ duration: duration! + index * 0.5 || 5 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="inline-block "
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
export default memo(AnimatedText);
