import mongoose, { Schema } from "mongoose";

interface User {
  interest: string;
  userType: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  address: string;
  phoneNumber: string;
  companyName?: string;
}

const UserSchema: Schema = new Schema({
  interest: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  companyName: {
    type: String,
    required: false,
  },
});

export const UserModel =
  mongoose.models.UserModel || mongoose.model<User>("UserModel", UserSchema);
