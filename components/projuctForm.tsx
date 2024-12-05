"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Save, ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

import { createProject, updateProject, uploadBlob } from "@/lib/actions/project-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
// import { uploadBlob } from "@/lib/blob-upload";

export default function ProjectForm({ initialProject = null }) {
  const router = useRouter();
  const [technologies, setTechnologies] = useState(
    initialProject?.technologies || []
  );
  const [newTech, setNewTech] = useState("");
  const [isPublic, setIsPublic] = useState(initialProject?.isPublic || false);
  const [loading, setLoading] = useState(false);

  // Image upload state
  const [projectImages, setProjectImages] = useState<File[]>(
    initialProject?.images
      ? initialProject.images.map((url) => ({ name: url }))
      : []
  );
  const [previewImages, setPreviewImages] = useState<string[]>(
    initialProject?.images || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setTechnologies(technologies.filter((tech) => tech !== techToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const validImageFiles = newFiles.filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
      );

      if (validImageFiles.length + projectImages.length > 5) {
        toast({
          title: "Error",
          description: "Maximum of 5 images allowed",
          variant: "destructive",
        });
        return;
      }

      const newPreviewUrls = validImageFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setProjectImages((prev) => [...prev, ...validImageFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setProjectImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    // Reset file input to allow re-uploading same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      // Upload images to blob storage first
      const uploadedImageUrls = await Promise.all(
        projectImages
          .filter((image) => image instanceof File)
          .map(async (image) => {
            if (image instanceof File) {
              return await uploadBlob(image);
            }
            return image;
          })
      );

      const projectData = {
        ...Object.fromEntries(formData),
        technologies: technologies,
        isPublic: isPublic,
        images: [...previewImages, ...uploadedImageUrls],
      };

      let result;
      if (initialProject) {
        const formData = new FormData();
        Object.entries(projectData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        });
        result = await updateProject(initialProject._id, formData);
      } else {
        const formData = new FormData();
        Object.entries(projectData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        });
        result = await createProject(formData);
      }

      if (result.success) {
        toast({
          title: "Success",
          description: initialProject
            ? "Project updated successfully"
            : "Project created successfully",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {initialProject ? "Edit Project" : "Create New Project"}
          </CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2">Project Title</label>
              <Input
                type="text"
                name="title"
                defaultValue={initialProject?.title}
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <Textarea
                name="description"
                defaultValue={initialProject?.description}
                placeholder="Describe your project"
                required
                rows={4}
              />
            </div>

            <div>
              <label className="block mb-2">Technologies</label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTechnology}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center bg-muted px-2 py-1 rounded"
                  >
                    {tech}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTechnology(tech)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Project Links</label>
              <Input
                type="url"
                name="githubLink"
                defaultValue={initialProject?.githubLink}
                placeholder="GitHub Repository Link"
                className="mb-2"
              />
              <Input
                type="url"
                name="liveLink"
                defaultValue={initialProject?.liveLink}
                placeholder="Live Project Link"
              />
            </div>

            <div>
              <label className="block mb-2">Project Images (Max 5)</label>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="project-image-upload"
                />
                <label htmlFor="project-image-upload">
                  <Button 
                  
                  type="button" variant="outline">
                    <ImagePlus className="h-4 w-4 mr-2" /> Upload Images
                  </Button>
                </label>
              </div>

              {/* Image Preview */}
              <div className="flex flex-wrap gap-2 mt-2">
                {previewImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Project image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <label htmlFor="isPublic">Make this project public</label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="animate-spin mr-2">●</div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {initialProject ? "Update Project" : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
