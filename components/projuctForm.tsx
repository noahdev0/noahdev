"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Save,
  Trash2,
  Upload,
  Loader2,
  Github,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";

import { uploadBlob } from "@/lib/actions/project-action";
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

// Type definitions
interface Project {
  _id?: string;
  title?: string;
  description?: string;
  technologies?: string[];
  githubLink?: string;
  liveLink?: string;
  isPublic?: boolean;
  images?: string[];
}

// Validation helpers
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Enhanced Input Component with Error State
const ErrorInput = ({
  error,
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  icon?: React.ElementType;
}) => (
  <div className="space-y-1">
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <Input
        {...props}
        className={`
          ${props.className || ""} 
          ${error ? "border-destructive focus:ring-destructive" : ""}
          ${Icon ? "pl-10" : ""}
        `}
      />
    </div>
    {error && <p className="text-destructive text-sm">{error}</p>}
  </div>
);

export default function ProjectForm({
  initialProject = null,
}: {
  initialProject?: Project | null;
}) {
  const router = useRouter();

  // Form state management
  const [state, setState] = useState({
    technologies: initialProject?.technologies || [],
    newTech: "",
    isPublic: initialProject?.isPublic || false,
    loading: false,
    projectImages: initialProject?.images
      ? initialProject.images.map((url) => ({ name: url }))
      : [],
    previewImages: initialProject?.images || [],
  });

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form validation
  const validateForm = useCallback((formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const githubLink = formData.get("githubLink") as string;
    const liveLink = formData.get("liveLink") as string;

    const newErrors: { [key: string]: string } = {};

    if (!title || title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!description || description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (githubLink && !isValidUrl(githubLink)) {
      newErrors.githubLink = "Invalid GitHub URL";
    }

    if (liveLink && !isValidUrl(liveLink)) {
      newErrors.liveLink = "Invalid Live Project URL";
    }

    return newErrors;
  }, []);

  // Technology handlers
  const handleAddTechnology = useCallback(() => {
    const newTech = state.newTech.trim();
    if (newTech && !state.technologies.includes(newTech)) {
      setState((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech],
        newTech: "",
      }));
    }
  }, [state.newTech, state.technologies]);

  const handleRemoveTechnology = useCallback((techToRemove: string) => {
    setState((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  }, []);

  // Image upload handlers
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newFiles = Array.from(files);
      const validImageFiles = newFiles.filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
      );

      if (state.projectImages.length + validImageFiles.length > 5) {
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

      setState((prev) => ({
        ...prev,
        projectImages: [...prev.projectImages, ...validImageFiles],
        previewImages: [...prev.previewImages, ...newPreviewUrls],
      }));
    },
    [state.projectImages]
  );

  const removeImage = useCallback((indexToRemove: number) => {
    setState((prev) => ({
      ...prev,
      projectImages: prev.projectImages.filter(
        (_, index) => index !== indexToRemove
      ),
      previewImages: prev.previewImages.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  }, []);

  // Drag and drop image upload
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files) {
      handleImageUpload({
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Submit handler
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      // Validate form
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors",
          variant: "destructive",
        });
        return;
      }

      // Clear previous errors
      setErrors({});

      // Set loading state
      setState((prev) => ({ ...prev, loading: true }));

      try {
        // Upload new images
        const uploadedImageUrls = await Promise.all(
          state.projectImages
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
          technologies: state.technologies,
          isPublic: state.isPublic,
          images: [...state.previewImages, ...uploadedImageUrls],
        };

        const fetchOptions = {
          method: "POST",
          body: Object.entries(projectData).reduce((formData, [key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((item) => formData.append(`${key}[]`, item));
            } else {
              formData.append(key, value.toString());
            }
            return formData;
          }, new FormData()),
        };

        const apiEndpoint = initialProject
          ? `/api/project/${initialProject._id}`
          : "/api/project";

        const result = await fetch(apiEndpoint, fetchOptions).then((res) =>
          res.json()
        );

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
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [
      state.technologies,
      state.isPublic,
      state.projectImages,
      state.previewImages,
      initialProject,
      router,
      validateForm,
    ]
  );

  // Memoized renderers
  const technologyList = useMemo(
    () =>
      state.technologies.map((tech) => (
        <div
          key={tech}
          className="flex items-center bg-muted px-2 py-1 rounded-md space-x-2"
        >
          <span className="text-sm">{tech}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleRemoveTechnology(tech)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )),
    [state.technologies, handleRemoveTechnology]
  );

  const imagePreviewList = useMemo(
    () =>
      state.previewImages.map((imageUrl, index) => (
        <div
          key={index}
          className="relative w-24 h-24 border rounded-lg overflow-hidden group"
        >
          <Image
            src={imageUrl}
            alt={`Project image ${index + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeImage(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )),
    [state.previewImages, removeImage]
  );

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {initialProject ? "Edit Project" : "Create New Project"}
          </CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Project Title */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Project Title
              </label>
              <ErrorInput
                type="text"
                name="title"
                defaultValue={initialProject?.title}
                placeholder="Enter project title"
                required
                error={errors.title}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <Textarea
                name="description"
                defaultValue={initialProject?.description}
                placeholder="Describe your project"
                required
                rows={4}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-destructive text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Technologies */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={state.newTech}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, newTech: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddTechnology();
                    }
                  }}
                  placeholder="Add technology (Press Enter or , to add)"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTechnology}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">{technologyList}</div>
            </div>

            {/* Project Links */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Project Links
              </label>
              <ErrorInput
                type="url"
                name="githubLink"
                defaultValue={initialProject?.githubLink}
                placeholder="GitHub Repository Link"
                className="mb-2"
                icon={Github}
                error={errors.githubLink}
              />
              <ErrorInput
                type="url"
                name="liveLink"
                defaultValue={initialProject?.liveLink}
                placeholder="Live Project Link"
                icon={LinkIcon}
                error={errors.liveLink}
              />
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="project-visibility"
                checked={state.isPublic}
                onCheckedChange={(checked) =>
                  setState((prev) => ({ ...prev, isPublic: checked }))
                }
              />
              <label htmlFor="project-visibility" className="text-sm">
                Make project public
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Project Images (Max 5)
              </label>
              <div
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center 
                  transition-colors duration-300
                  ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      {isDragOver
                        ? "Drop files here"
                        : "Drag and drop files or click to upload"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      (Max 5 images, each under 5MB)
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              <div className="flex flex-wrap gap-2 mt-4">
                {imagePreviewList}
              </div>
            </div>
          </CardContent>

          {/* Form Footer with Submit Button */}
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={state.loading}>
              {state.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialProject ? "Update Project" : "Create Project"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
