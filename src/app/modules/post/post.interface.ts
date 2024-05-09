import { Types } from "mongoose";

export interface IPost {
  user_id: Types.ObjectId;
  text?: string;
  files?: string[];
  post_type: string;
}
