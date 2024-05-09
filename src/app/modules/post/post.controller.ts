import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const location = (req as any).file.location;
  const result = await PostServices.createPost(userId, location, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "the post created",
    data: result,
  });
});

export const PostController = {
  createPost,
};
