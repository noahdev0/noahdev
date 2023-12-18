import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProjectImages: React.FC = () => {
  const images = [
    "/web1.png",
    "/web2.png",
    "/web3.png",
    "/web4.png",
    "/web5.png",
    "/web6.png",
  ];
  return (
    <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
      {/* eeddza */}
      {images.map((image, index) => (
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="basis-1/4 flex-1 shadow-xl"
          key={index}
        >
          <img src={image} alt={`Image ${index}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectImages;
