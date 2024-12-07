
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const morphShapes = {
  cube: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    borderRadius: "0%",
  },
  sphere: {
    scale: 1,
    rotateX: 45,
    rotateY: 45,
    borderRadius: "50%",
  },
  pyramid: {
    scale: 0.8,
    rotateX: 60,
    rotateY: 0,
    borderRadius: "0%",
  },
  star: {
    scale: 1.2,
    rotateX: -30,
    rotateY: 45,
    borderRadius: "0% 50% 0% 50%",
  },
};

const MorphDemo = ({ isPlaying }) => {
  const [shape, setShape] = useState("cube");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create smooth spring animations for mouse movement
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [45, -45]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-45, 45]), {
    stiffness: 200,
    damping: 30,
  });

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="h-64 w-full flex items-center justify-center [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <motion.div
          className="w-32 h-32 [transform-style:preserve-3d] cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #FF0080, #7928CA)",
            boxShadow: "0 0 30px rgba(0,0,0,0.2)",
            rotateX: isPlaying ? rotateX : 0,
            rotateY: isPlaying ? rotateY : 0,
          }}
          animate={
            isPlaying
              ? {
                  ...morphShapes[shape],
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }
              : {}
          }
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 50px rgba(0,0,0,0.3)",
          }}
          onClick={() => {
            const shapes = Object.keys(morphShapes);
            const currentIndex = shapes.indexOf(shape);
            const nextIndex = (currentIndex + 1) % shapes.length;
            setShape(shapes[nextIndex]);
          }}
        >
          {/* Front face reflection */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            }}
          />

          {/* Side faces for 3D effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full [transform:rotateY(90deg) translateZ(64px)]"
            style={{
              background: "linear-gradient(135deg, #7928CA, #FF0080)",
              opacity: 0.7,
            }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full [transform:rotateY(-90deg) translateZ(-32px)]"
            style={{
              background: "linear-gradient(135deg, #FF0080, #7928CA)",
              opacity: 0.7,
            }}
          />
        </motion.div>

        {/* Interactive hint */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-gray-500 whitespace-nowrap">
          Click to change shape • Move mouse to rotate
        </div>
      </div>
    </div>
  );
};

export default MorphDemo;
