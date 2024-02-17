import { Secret } from "jsonwebtoken";
import { ILogin, ILoginResponse, IUser } from "./auth.interfaces";
import { User } from "./auth.models";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { JwtHelpers } from "../../../shared/jwtHelpers";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.my_email,
    pass: config.my_password,
  },
});

const createUser = async (payload: IUser): Promise<IUser> => {
  const isExistUser = await User.findOne({
    email: payload.email,
  });
  if (isExistUser && !isExistUser?.isVerified) {
    throw new ApiError(
      401,
      "your request has pending please contact with the admin to accept your request, Thank you"
    );
  }
  if (isExistUser && isExistUser.isVerified) {
    throw new ApiError(
      401,
      "please login!, you alredy have an account to login"
    );
  }
  const result = await User.create(payload);
  return result;
};

const LogIn = async (payload: ILogin): Promise<ILoginResponse> => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new ApiError(
      404,
      "kindly make a request to create an account from admin"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      401,
      "your creadential are not valid, kindly check it again please"
    );
  }

  const accessToken = await JwtHelpers.createToken(
    {
      userId: isUserExist?._id,
      role: isUserExist?.role,
      isVerified: isUserExist?.isVerified,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  return {
    isVerified: isUserExist.isVerified,
    userId: isUserExist._id.toString(),
    email: isUserExist.email,
    role: isUserExist.role,
    token: accessToken,
  };
};

const verifyEmailAndUpdateStatus = async (userId: string) => {
  const isExist = await User.findById(userId);

  if (!isExist) {
    throw new ApiError(404, "the user dosn't exist");
  }

  const generateRandomPassword = (length: number) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const password = generateRandomPassword(8);

  console.log("password", password);

  const hashedPassword = await bcrypt.hash(password, 12);

  console.log("HashedPassword", hashedPassword);

  const updateUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { isVerified: true, password: hashedPassword } }
  );

  const mailOptions = {
    from: config.my_email,
    to: isExist.email,
    subject: "verify your email",
    html: `
    <p>Hello ${isExist.name},</p>
    <p>The password sent to you is your login password. You can now log in using your email and this password on our website.</p>
    <p>Try logging in now with the following details:</p>
    <p>Email: ${isExist.email}</p>
    <p>Password: ${password}</p>
    <p>Thank you!</p>
  `,
  };
  const result = await transporter.sendMail(mailOptions);

  return result;
};

export const AuthUserServices = {
  createUser,
  LogIn,
  verifyEmailAndUpdateStatus,
};
