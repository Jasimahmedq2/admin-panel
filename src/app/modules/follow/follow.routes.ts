import express from "express";
import { FollowControllers } from "./follow.controller";
const router = express.Router();

router.post("/", FollowControllers.followUser);

export const FollowRoutes = router;
