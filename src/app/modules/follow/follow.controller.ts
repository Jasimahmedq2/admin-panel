import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FollowServices } from "./follow.service";

const followUser = catchAsync(async (req: Request, res: Response) => {
  const result = await FollowServices.followUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "followed",
    data: result,
  });
});

export const FollowControllers = {
  followUser,
};
