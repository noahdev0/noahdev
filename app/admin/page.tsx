"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

import { getProjects, deleteProject } from "@/lib/actions/project-action";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { toast } from "@/hooks/ui/use-toast";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingProject, setDeletingProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to load projects", error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete project", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-foreground">
          Project Dashboard
        </h1>
        <Link
          href="/projects/new"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "flex items-center gap-2"
          )}
        >
          <Plus className="h-5 w-5" />
          Add New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-2xl mb-4">No Projects Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start by adding your first project!
          </p>
          <Link
            href="/projects/new"
            className={buttonVariants({ variant: "default" })}
          >
            Create First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {project.title}
                  <Badge variant={project.isPublic ? "default" : "secondary"}>
                    {project.isPublic ? "Public" : "Private"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Link
                    href={`/projects/view/${project._id}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon",
                    })}
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/projects/edit/${project._id}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon",
                    })}
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeletingProject(project._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your project from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProject(deletingProject)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
