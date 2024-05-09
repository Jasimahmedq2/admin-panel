import ApiError from "../../../errors/apiError";
import { IFollow } from "./follow.interface";
import { Follow } from "./follow.model";

const followUser = async (payload: IFollow) => {
  const { follower, followed } = payload;
  const existingFollow = await Follow.findOne({ follower, followed });
  if (existingFollow) {
    throw new ApiError(403, "Already following this user");
  }
  const follow = new Follow({ follower, followed });
  await follow.save();
};

export const FollowServices = {
  followUser,
};
