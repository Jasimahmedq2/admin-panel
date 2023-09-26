import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./auth.interfaces";
import { UserRoleConstant } from "./auth.constant";

const UserModel = new Schema<IUser>({
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
    required: true,
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
  phoneNo: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  birthday: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("user", UserModel);
