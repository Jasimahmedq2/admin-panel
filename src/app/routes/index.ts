import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = express.Router();

const CoreRoutes = [
  {
    path: "/auth",
    element: AuthRoutes,
  },
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
