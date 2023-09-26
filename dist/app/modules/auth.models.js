"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const auth_constant_1 = require("./auth.constant");
const UserModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: auth_constant_1.UserRoleConstant,
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "",
    },
    birthday: {
        type: String,
        required: true,
    },
});
exports.User = (0, mongoose_1.model)("user", UserModel);
