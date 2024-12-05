import mongoose from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

// Define User model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Get User model (handle case where model might already be compiled)
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
