import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import redis from "@/models/redis";
import mongoose from "mongoose";

// Define ProjectSchema
const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  githubLink: z.string().url(),
  liveLink: z.string().url(),
  isPublic: z.boolean(),
  images: z.array(z.string()),
});
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const technologiesRaw = formData.getAll("technologies[]");
    const technologies =
      technologiesRaw.length > 0
        ? technologiesRaw.map((tech) => tech.toString().trim()).filter(Boolean)
        : [];

    // Extract and process form fields
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies: technologies,

      githubLink: formData.get("githubLink") as string,
      liveLink: formData.get("liveLink") as string,
      isPublic: formData.get("isPublic") === "true",
      images: formData.getAll("images[]") as string[],
    };

    // Validate input using Zod schema
    const validatedData = ProjectSchema.parse(rawData);

    // Connect to database
    await connectDB();

    // Get user authentication (assuming you have a session management system)
    const userId = "674ddb0010c91642fbafc3d8"; // Hardcoded for demo purposes
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Create project in MongoDB
    const project = new Project({
      ...validatedData,
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Save project
    await project.save();

    // Cache project in Redis
    const redisKey = `project:${project._id}`;
    await redis.set(
      redisKey,
      JSON.stringify(project),
      "EX",
      3600 * 24 * 30 // 30-day cache
    );

    // Invalidate projects list cache
    await redis.del("projects:all");

    // Log successful project creation
    console.info(`Project created successfully: ${project._id}`, {
      projectId: project._id,
      userId: userId,
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    // Detailed error handling
    console.error("Project creation error:", error);

    // Handle specific error types
    if (error instanceof z.ZodError) {
      // Zod validation error
      console.warn("Validation failed", {
        errors: error.errors,
      });

      return NextResponse.json({
        success: false,
        error: "Invalid project data",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      // Mongoose validation error
      console.warn("Mongoose validation failed", {
        errors: error.errors,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Invalid project data",
          details: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    // Generic error handling
    console.error("Unexpected error during project creation", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      success: false,
      error: "Failed to create project",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Fetch all projects
    const projects = await Project.find()
      .sort({ createdAt: -1 }) // Sort by most recent first
      .populate("userId", "name email") // Optional: populate user details
      .lean(); // Convert to plain JavaScript objects

    // Return response
    return NextResponse.json(
      {
        success: true,
        data: projects,
        total: projects.length,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Project retrieval error:", error);

    // Handle errors
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve projects",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// async function GET(req: NextRequest) {
//   const projects = await Project.find({}).exec();

//   return NextResponse.json({ projects }, { status: 200 });
// }

// async function PUT(req: NextRequest) {
//   const data = await req.json();
//   const { formData } = data.body;

//   return NextResponse.json({ data }, { status: 200 });
// }

// async function DELETE(req: NextRequest) {
//   const data = await req.json();
//   const { projectId } = data.body;

//   return NextResponse.json({ data }, { status: 200 });
// }

export { POST, GET };
