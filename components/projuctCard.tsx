import { ExternalLink, Github } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

type Props = {
  project: {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: {
      light: string;
      dark: string;
    };
  };
  theme: string;
};

function ProjectCard({ project, theme }: Props) {
  return (
    <div className="transform transition-all hover:-translate-y-1">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            width={500}
            height={500}
            src={
              theme === "dark" ? project.imageUrl.dark : project.imageUrl.light
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
  );
}

export default ProjectCard;
