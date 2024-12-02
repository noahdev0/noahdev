"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, ServerIcon } from "lucide-react";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "CSEN web app with dashboard",
      description: "CMS for csen .",
      technologies: [
        "Next.js",
        "TypeScript",
        "NextAuth.js",
        "MongoDB",
        "Framer Motion",
      ],
      imageUrl: "/images/projects/ecommerce.png",
      githubLink: "https://github.com/noahdev0/csen",
      liveLink: "https://csen.com",
      category: "Fullstack",
    },
    {
      title: "EGSDZ E-Learning Platform",
      description:
        "Responsive high-performance e-learning platform with video streaming and quizzes.",
      technologies: [
        "React",
        "Node.js",
        "websocket",
        "Express",
        "MongoDB",
        "Redux-thunk",
        "Redis",
      ],
      imageUrl: "/images/projects/egs.png",
      githubLink: "https://github.com/noahdev/",
      liveLink: "https://egsdz.com",

      category: "Fullstack",
    },
    {
      title: "FEEEF ecosystem",
      description: "Ecommerce platform provider.",
      technologies: [
        "AdonisJs",
        "React",
        "NextJs",
        "WebSockets",
        "Docker",
        "Redis",
        "Coolify",
        "AWS",
        "PostgreSQL",
      ],
      imageUrl: "/images/projects/chatbot.png",
      githubLink: "https://github.com/yourusername/ai-chatbot",
      liveLink: "https://egsdz.com",
      category: "fullstack",
    },
  ];

  const categories = ["All", "Frontend", "Backend", "Fullstack"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>

        <div className="flex justify-center mb-12">
          <Tabs
            defaultValue="All"
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ServerIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
