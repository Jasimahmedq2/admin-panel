import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/apiError";
import { JwtHelpers } from "../../shared/jwtHelpers";
import { ILogin, IUser } from "./auth.interfaces";
import { User } from "./auth.models";
import bcrypt from "bcrypt";

const createUser = async (payload: IUser): Promise<IUser | null> => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const isExistUser = await User.findOne({
    email: payload.email,
    phoneNo: payload.phoneNo,
  });

  if (isExistUser) {
    throw new ApiError(500, "the user already exist");
  }

  const result = await User.create(payload);
  return result;
};

const LogIn = async (payload: ILogin): Promise<string> => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }
  const isPasswordMatched = await bcrypt.compare(
    isUserExist.password,
    payload.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "something went wrong");
  }

  const accessToken = JwtHelpers.createToken(
    {
      userId: isUserExist?._id,
      role: isUserExist?.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  return accessToken;
};

export const AuthUserServices = {
  createUser,
  LogIn,
};
