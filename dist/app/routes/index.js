"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth.route");
const router = express_1.default.Router();
const CoreRoutes = [
    {
        path: "/auth",
        element: auth_route_1.AuthRoutes,
    },
];
CoreRoutes.forEach((route) => router.use(route.path, route.element));
exports.default = router;
