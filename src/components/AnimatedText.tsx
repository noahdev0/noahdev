"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
}

const AnimatedText = (props: Props) => {
  return (
    <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
      {props.text.split("").map((char, index) => (
        <motion.span
          key={char + "-" + index}
          animate={{
            x: [0, 10, -10, 0].map((x) => (Math.random() - 0.5) * x * 50),
            y: [0, 10, -10, 0].map((y) => (Math.random() - 0.5) * y * 100),
            rotate: [0, 10, -10, 0].map((r) => (Math.random() - 0.5) * r * 100),
          }}
          transition={{ duration: 5 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
};
export default memo(AnimatedText);
