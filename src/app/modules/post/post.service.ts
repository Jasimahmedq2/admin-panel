import { Subscribe } from "../subscrib/subscrib.model";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (
  userId: number,
  location: string,
  payload: Partial<IPost>
) => {
  const post = new Post({
    user_id: userId,
    text: payload?.text,
    files: [location],
  });
  const result = await post.save();
  const subscrib = await Subscribe.create({ post_id: result?._id });
};

export const PostServices = {
  createPost,
};
