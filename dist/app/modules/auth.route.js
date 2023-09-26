"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/registration", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.CreateUser), auth_controller_1.AuthUserControllers.createUser);
router.post("/logIn", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.logInUser), auth_controller_1.AuthUserControllers.LogIn);
router.post("/verify/:token", auth_controller_1.AuthUserControllers.verifyEmailAndUpdateStatus);
exports.AuthRoutes = router;
