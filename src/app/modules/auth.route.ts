import express from "express";
import { AuthUserControllers } from "./auth.controller";
import ValidateRequest from "../middleware/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
import auth from "../middleware/auth";
const router = express.Router();

router.post(
  "/registration",
  ValidateRequest(AuthValidationSchema.CreateUser),
  AuthUserControllers.createUser
);

router.post(
  "/logIn",
  ValidateRequest(AuthValidationSchema.logInUser),
  AuthUserControllers.LogIn
);

router.post("/verify/:token", AuthUserControllers.verifyEmailAndUpdateStatus);

export const AuthRoutes = router;
