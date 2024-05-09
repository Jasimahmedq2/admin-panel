import express from "express";
import { PostController } from "./post.controller";
import upload from "../../../utils/multer";
import auth from "../../middleware/auth";

const router = express.Router();

router
  .route("/")
  .post(auth("user"), upload.single("file"), PostController.createPost);

export const postRoutes = router;
