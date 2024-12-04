"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ServerIcon } from "lucide-react";
import Image from "next/image";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { theme } = useTheme();

  const projects = [
    {
      title: "CSEN web app with dashboard",
      description: "CMS for csen.",
      technologies: [
        "Next.js",
        "TypeScript",
        "NextAuth.js",
        "MongoDB",
        "Framer Motion",
      ],
      imageUrl: {
        light: "/images/projects/csen.png",
        dark: "/images/projects/csen.png",
      },
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
      imageUrl: {
        light: "/images/projects/light-egs.png",
        dark: "/images/projects/dark-egs.png",
      },
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
      imageUrl: {
        light: "/images/projects/light-feeef.png",
        dark: "/images/projects/dark-feeef.png",
      },
      category: "Fullstack",
    },
  ];

  const categories = ["All", "Frontend", "Backend", "Fullstack"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          My Real World 🌎 Projects
        </h1>

        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-lg bg-card">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="transform transition-all hover:-translate-y-1"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    width={500}
                    height={500}
                    src={
                      theme === "dark"
                        ? project.imageUrl.dark
                        : project.imageUrl.light
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
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
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-background hover:bg-accent">
                    <Github className="h-4 w-4" />
                    GitHub
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <ServerIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
