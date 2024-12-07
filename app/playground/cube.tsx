"use clinet";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const InteractiveCube = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse/touch movement to rotation
  const rotateX = useTransform(y, [-200, 200], [45, -45]);
  const rotateY = useTransform(x, [-200, 200], [-45, 45]);

  return (
    <div className="relative h-96 w-full flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {isPlaying ? "Stop Animation" : "Start Animation"}
      </button>

      <div className="h-64 w-full flex items-center justify-center [perspective:1200px]">
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{
            x,
            y,
            rotateX: isPlaying ? [0, 360] : rotateX,
            rotateY: isPlaying ? [0, 360] : rotateY,
            transformOrigin: "center center",
          }}
          animate={
            isPlaying
              ? {
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }
              : undefined
          }
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
          className="relative w-32 h-32 cursor-grab active:cursor-grabbing [transform-style:preserve-3d]"
        >
          {/* Front face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg"
            style={{
              transform: "translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/6th.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>

          {/* Back face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"
            style={{
              transform: "rotateY(180deg) translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/5th.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>

          {/* Right face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
            style={{
              transform: "rotateY(90deg) translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/4th.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>

          {/* Left face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 shadow-lg"
            style={{
              transform: "rotateY(-90deg) translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/3rd.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>

          {/* Top face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg"
            style={{
              transform: "rotateX(90deg) translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/1st.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>

          {/* Bottom face */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg"
            style={{
              transform: "rotateX(-90deg) translateZ(64px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full h-full p-4 flex items-center justify-center text-white font-bold">
              <Image
                draggable={false}
                className="select-none"
                src={"/2nd.svg"}
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveCube;
