import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { FollowRoutes } from "../modules/follow/follow.routes";
import { postRoutes } from "../modules/post/post.routes";

const router = express.Router();

const CoreRoutes = [
  {
    path: "/auth",
    element: AuthRoutes,
  },
  {
    path: "/follow",
    element: FollowRoutes,
  },
  {
    path: "/post",
    element: postRoutes,
  },
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
