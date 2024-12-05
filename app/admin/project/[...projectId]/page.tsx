"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, GithubIcon, ArrowLeft } from "lucide-react";

import { getProjectById } from "@/lib/actions/project-action";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
export default function ProjectViewPage({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const fetchedProject = await getProjectById(projectId);
        setProject(fetchedProject);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl mb-4">Project Not Found</h2>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "default" })}
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Link
        href="/dashboard"
        className="flex items-center mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {project.title}
            <Badge variant={project.isPublic ? "default" : "secondary"}>
              {project.isPublic ? "Public" : "Private"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Project Description
              </h3>
              <p className="text-muted-foreground">{project.description}</p>

              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="flex items-center hover:text-primary"
                  >
                    <GithubIcon className="mr-2 h-5 w-5" />
                    GitHub Repository
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                )}

                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="flex items-center hover:text-primary"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Project
                  </Link>
                )}

                {!project.githubLink && !project.liveLink && (
                  <p className="text-muted-foreground">
                    No external links available
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3">Project Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Created At</p>
                    <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p>{project.isPublic ? "Public" : "Private"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href={`/projects/edit/${project._id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Edit Project
          </Link>
          <Button
            variant="destructive"
            onClick={() => {
              // Implement delete functionality
              // Could open a confirmation dialog or trigger delete action
            }}
          >
            Delete Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
