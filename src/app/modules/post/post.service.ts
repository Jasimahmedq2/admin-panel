import mongoose from "mongoose";
import { Subscribe } from "../subscrib/subscrib.model";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { pull } from "./pull.model";

const createPost = async (
  userId: number,
  location: string,
  payload: Partial<IPost>
) => {
  console.log({ payload });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const post = new Post({
      user_id: userId,
      text: payload?.text,
      files: [location],
      post_type: payload?.post_type,
      access_post: payload?.access_post,
    });
    const result = await post.save();
    // subscribe
    const subscribe = await Subscribe.create({ post_id: result?._id });
    // create pull
    if (payload.post_type === "pull" && payload?.pull) {
      for (let i = 0; i < payload.pull.length; i++) {
        const elm = payload.pull[i];
        const createPull = await pull.create({
          post_id: result?._id,
          text: elm,
        });
      }
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  }
};

export const PostServices = {
  createPost,
};
