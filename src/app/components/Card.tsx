"use client";
import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  content: string;
  subtitle: string;
  image: string;
  list?: string[];
}
let list = ["JavaScript", "Python", "Sass", "CSS"];

const Card: React.FC<CardProps> = ({
  title,
  content,
  list,
  subtitle,
  image,
}) => {
  
  return (
    <div className="text-center flex flex-col justify-between items-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
      <Image src={image} width={100} height={100} alt="" />
      <h3 className="text-lg font-medium pt-8 pb-2 ">{title}</h3>
      <p className="py-2">{content}</p>
      <h4 className="py-4 text-teal-600">{subtitle}</h4>
      {list &&
        list.map((item, i) => (
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileInView={{ scale: 1.1 }}
            key={i}
            className="text-gray-800 py-1"
          >
            {item}
          </motion.p>
        ))}
    </div>
  );
};

export default Card;
