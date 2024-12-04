"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  CodeBracketIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownloadResume = () => {
    window.open("/CV.pdf", "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen mt-8 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />

      <div className=" mx-auto px-4  relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="mb-4 hover:bg-primary/20 transition-colors duration-300"
              >
                ✨ Available for Freelance
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Hi, {"I'm "}
                <span className="text-primary relative inline-block">
                  Noahdev0
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium">
                Web Developer & Creative Technologist
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Crafting elegant, efficient web solutions that transform ideas
              into digital experiences. Specializing in modern web technologies
              and creating intuitive, performance-driven applications.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleDownloadResume}
                className="group relative overflow-hidden hover:bg-primary/90 transition-colors duration-300"
                size="lg"
              >
                <span className="relative z-10 flex items-center">
                  <ArrowDownIcon className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                  Download Resume
                </span>
              </Button>

              <Button
                variant="outline"
                className="group relative overflow-hidden"
                size="lg"
                asChild
              >
                <Link href="/projects" className="flex items-center">
                  <CodeBracketIcon className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  View Projects
                  <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <EnvelopeIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <GlobeAltIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Card
              className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src="/ZED.jpg"
                    alt="Profile Picture"
                    fill
                    priority
                    className={`object-cover transition-transform duration-700 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
