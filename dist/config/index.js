"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    db_string: process.env.DB_STRING,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        access_secret: process.env.ACCESS_SECRET,
        access_expire: process.env.ACCESS_EXPIRE,
        verify_secret: process.env.VERIFY_SECRET,
        verify_email_expire: process.env.VERIFY_EMAIL_EXPIRE,
    },
    my_email: process.env.MY_EMAIL,
    my_password: process.env.MY_PASSWORD,
};
