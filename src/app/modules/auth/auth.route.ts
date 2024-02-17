import express from "express";
import { AuthUserControllers } from "./auth.controller";
import { AuthValidationSchema } from "./auth.validation";
import auth from "../../middleware/auth";
import ValidateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-request",
  ValidateRequest(AuthValidationSchema.CreateUser),
  AuthUserControllers.createUser
);

router.post(
  "/logIn",
  ValidateRequest(AuthValidationSchema.logInUser),
  AuthUserControllers.LogIn
);

router.post(
  "/approve/:id",
  auth("admin"),
  AuthUserControllers.verifyEmailAndUpdateStatus
);

export const AuthRoutes = router;
