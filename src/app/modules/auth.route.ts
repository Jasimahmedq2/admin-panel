import express from "express";
import { AuthUserControllers } from "./auth.controller";
const router = express.Router();

router.post("/registration", AuthUserControllers.createUser);
router.post("/logIn", AuthUserControllers.LogIn);

export const AuthRoutes = router;
