"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import mongoose from "mongoose";
import { Project } from "@/models/Project";
import redis from "@/models/redis";
// import redis from "@/lib/redis";
// import Project from "@/models/Project";
// import clientPromise from "@/lib/mongodb";
// lib/blob-upload.ts
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function uploadBlob(file: File): Promise<string> {
  try {
    // Generate a unique filename
    const filename = `project-images/${uuidv4()}-${file.name}`;

    // Upload to Vercel Blob Storage
    const blob = await put(filename, file, {
      access: "public",
    });

    return blob.url;
  } catch (error) {
    console.error("Blob upload error:", error);
    throw new Error("Failed to upload image");
  }
}

// Project Validation Schema
const ProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.array(z.string()).optional(),
  githubLink: z.string().url().optional(),
  liveLink: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
});

// Connect to MongoDB
async function connectMongoDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

// Create Project Server Action
export async function createProject(formData: FormData) {
  try {
    // Validate input
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies: (formData.get("technologies") as string)
        ?.split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      githubLink: formData.get("githubLink") as string,
      liveLink: formData.get("liveLink") as string,
      isPublic: formData.get("isPublic") === "true",

    };

    // Validate data
    const validatedData = ProjectSchema.parse(rawData);

    // Connect to MongoDB
    await connectMongoDB();
    // const Cookies = await cookies();

    // // Get user ID from session (you'll need to implement session management)
    // const userId = Cookies.get("userId")?.value;
    // if (!userId) {
    //   throw new Error("User not authenticated");
    // }

    // Create project in MongoDB
    const project = new Project({
      ...validatedData,
      
      // userId: new mongoose.Types.ObjectId(userId),
    });
    await project.save();

    // Cache project in Redis
    const redisKey = `project:${project._id}`;
    await redis.set(redisKey, JSON.stringify(project), "EX", 3600 * 24); // 24-hour cache

    // Invalidate projects list cache
    await redis.del("projects:all");

    return { success: true, project };
  } catch (error) {
    console.error("Project creation error:", error);
    return {
      success: false,
      error:
        error instanceof z.ZodError ? error.errors : "Failed to create project",
    };
  }
}

// Get Projects Server Action
export async function getProjects() {
  try {
    // Check Redis cache first
    const cachedProjects = await redis.get("projects:all");
    if (cachedProjects) {
      return JSON.parse(cachedProjects);
    }

    // Connect to MongoDB
    await connectMongoDB();
    const Cookies = await cookies();

    // Get user ID from session
    const userId = Cookies.get("userId")?.value;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Fetch projects from MongoDB
    const projects = await Project.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();

    // Cache projects in Redis
    await redis.set("projects:all", JSON.stringify(projects), "EX", 3600); // 1-hour cache

    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

// Get Single Project Server Action
export async function getProjectById(projectId: string) {
  try {
    // Check Redis cache first
    const redisKey = `project:${projectId}`;
    const cachedProject = await redis.get(redisKey);
    if (cachedProject) {
      return JSON.parse(cachedProject);
    }

    // Connect to MongoDB
    await connectMongoDB();
    const Cookies = await cookies();

    // Get user ID from session
    const userId = Cookies.get("userId")?.value;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Find project in MongoDB
    const project = await Project.findOne({
      _id: new mongoose.Types.ObjectId(projectId),
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();

    if (!project) {
      throw new Error("Project not found");
    }

    // Cache project in Redis
    await redis.set(redisKey, JSON.stringify(project), "EX", 3600 * 24); // 24-hour cache

    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

// Update Project Server Action
export async function updateProject(projectId: string, formData: FormData) {
  try {
    // Validate input
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies: (formData.get("technologies") as string)
        ?.split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      githubLink: formData.get("githubLink") as string,
      liveLink: formData.get("liveLink") as string,
      isPublic: formData.get("isPublic") === "true",
    };

    // Validate data
    const validatedData = ProjectSchema.parse(rawData);

    // Connect to MongoDB
    await connectMongoDB();
    const Cookies = await cookies();

    // Get user ID from session
    const userId = Cookies.get("userId")?.value;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Update project in MongoDB
    const project = await Project.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(projectId),
        userId: new mongoose.Types.ObjectId(userId),
      },
      validatedData,
      { new: true }
    );

    if (!project) {
      throw new Error("Project not found");
    }

    // Update Redis cache
    const redisKey = `project:${projectId}`;
    await redis.set(redisKey, JSON.stringify(project), "EX", 3600 * 24);

    // Invalidate projects list cache
    await redis.del("projects:all");

    return { success: true, project };
  } catch (error) {
    console.error("Project update error:", error);
    return {
      success: false,
      error:
        error instanceof z.ZodError ? error.errors : "Failed to update project",
    };
  }
}

// Delete Project Server Action
export async function deleteProject(projectId: string) {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    const Cookies = await cookies();

    // Get user ID from session
    const userId = Cookies.get("userId")?.value;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Delete project from MongoDB
    const project = await Project.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(projectId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!project) {
      throw new Error("Project not found");
    }

    // Remove from Redis cache
    const redisKey = `project:${projectId}`;
    await redis.del(redisKey);

    // Invalidate projects list cache
    await redis.del("projects:all");

    return { success: true };
  } catch (error) {
    console.error("Project deletion error:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
