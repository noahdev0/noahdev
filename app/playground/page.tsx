"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Shuffle,
  Layers,
  Box,
  Grid3X3,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MorphDemo from "./morph";
import InteractiveCube from "./cube";
// import ProgrammingLanguagesShowcase from "./prog";

const ThreeDPlayground = () => {
  const [activeDemo, setActiveDemo] = useState("cube");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentColor, setCurrentColor] = useState(0);

  const colors = ["#FF0080", "#7928CA", "#0070F3", "#00CC88"];

  const demoComponents = {
    cube: {
      title: "3D Cube",
      icon: <Box />,
      content: <InteractiveCube />,
    },
    grid: {
      title: "3D Grid",
      icon: <Grid3X3 />,
      content: (
        <div className="h-64 w-full grid grid-cols-3 grid-rows-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 rounded-lg"
              whileHover={{ scale: 1.1, rotateX: 180, rotateY: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      ),
    },
    stack: {
      title: "3D Stack",
      icon: <Layers />,
      content: (
        <div className="h-64 w-full flex items-center justify-center">
          <motion.div className="relative w-40 h-40">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full bg-opacity-80 rounded-lg"
                style={{
                  backgroundColor: colors[index % colors.length],
                  zIndex: 5 - index,
                }}
                animate={{
                  translateY: isPlaying
                    ? [-index * 8, -index * 8 - 20]
                    : -index * 8,
                  rotateZ: isPlaying ? [0, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2,
                }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>
        </div>
      ),
    },
    morph: {
      title: "Shape Morph",
      icon: <Compass />,
      content: <MorphDemo isPlaying={isPlaying} />,
    },
    // ProgrammingLanguagesShowcase: {
    //   title: "Shape Morph",
    //   icon: <Compass />,
    //   content: <ProgrammingLanguagesShowcase />,
    // },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">3D Playground</h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentColor((currentColor + 1) % colors.length)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Shuffle className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(demoComponents).map(([key, demo]) => (
          <motion.button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
              activeDemo === key ? "bg-blue-100" : "bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {demo.icon}
            <span className="text-sm font-medium">{demo.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{demoComponents[activeDemo].title}</CardTitle>
            </CardHeader>
            <CardContent>{demoComponents[activeDemo].content}</CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ThreeDPlayground;
