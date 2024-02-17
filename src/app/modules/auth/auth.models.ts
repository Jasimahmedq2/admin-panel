import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./auth.interfaces";
import { UserRoleConstant } from "./auth.constant";

const UserModel = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    role: {
      enum: UserRoleConstant,
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    lastVisited: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("user", UserModel);
