import { NextFunction, Request, Response } from "express";
import { AuthUserServices } from "./auth.services";
import sendResponse from "../../shared/sendResponse";
import { IUser } from "./auth.interfaces";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthUserServices.createUser(req.body);
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: "successfully created a user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const LogIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthUserServices.LogIn(req.body);
    sendResponse<string>(res, {
      statusCode: 200,
      success: true,
      message: "successfully logged in a user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthUserControllers = {
  createUser,
  LogIn,
};
