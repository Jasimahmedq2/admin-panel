import { z } from "zod";
import { UserRoleConstant } from "./auth.constant";

const CreateUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    role: z.enum([...UserRoleConstant] as [string, ...string[]]).optional(),
    phoneNo: z.string({
      required_error: "phone number is required",
    }),
    image: z.string({ required_error: "image is required" }),
    birthday: z.string({ required_error: "your birthday is required" }),
  }),
});

const logInUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const AuthValidationSchema = {
  CreateUser,
  logInUser,
};
