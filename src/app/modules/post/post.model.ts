import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";
import { PostType } from "./post.constant";

const PostSchema: Schema = new Schema<IPost>({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  files: [{ type: String }],
  post_type: {
    enum: PostType,
    type: String,
    default: "public",
  },
});

export const Post = model<IPost>("post", PostSchema);
