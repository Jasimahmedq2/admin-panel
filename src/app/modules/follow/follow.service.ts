import ApiError from "../../../errors/apiError";
import { IFollow } from "./follow.interface";
import { Follow } from "./follow.model";
import { Types } from "mongoose";

const followUser = async (payload: IFollow) => {
  const { follower, followed } = payload;
  if (follower.toString() === followed.toString()) {
    throw new Error("A user cannot follow themselves.");
  }
  const existingFollow = await Follow.findOne({ follower, followed });
  if (existingFollow) {
    throw new ApiError(403, "Already following this user");
  }
  const follow = new Follow({ follower, followed });
  await follow.save();
};

const unFollowUser = async (payload: IFollow) => {
  const { follower, followed } = payload;
  const existingFollow = await Follow.findOne({ follower, followed });
  if (!existingFollow) {
    throw new ApiError(404, "following relationship not found");
  }
  const follow = await Follow.findOneAndDelete({ follower, followed });
  return follow;
};

// get all follower
const getAllFollowers = async (userId: Types.ObjectId) => {
  const follows = await Follow.find({ followed: userId }).populate({
    path: "follower",
    select: "_id name image",
  });

  return follows;
};
// get all following
const getAllFollowing = async (userId: Types.ObjectId) => {
  const follows = await Follow.find({ follower: userId }).populate({
    path: "followed",
    select: "_id name image",
  });

  return follows;
};

export const FollowServices = {
  followUser,
  unFollowUser,
  getAllFollowers,
  getAllFollowing,
};
