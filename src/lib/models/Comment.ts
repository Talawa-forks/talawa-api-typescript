import { Schema, model, PopulatedDoc, Types, Document, models } from "mongoose";
import { Interface_Post } from "./Post";
import { Interface_User } from "./User";

export interface Interface_Comment {
  _id: Types.ObjectId;
  text: string;
  createdAt: Date;
  creator: PopulatedDoc<Interface_User & Document>;
  post: PopulatedDoc<Interface_Post & Document>;
  likedBy: Array<PopulatedDoc<Interface_User & Document>>;
  likeCount: number;
  status: string;
}
/**
 * @name commentSchema
 * @function
 * @description This is the Structure of the Comments
 * @param {string} text Text
 * @param {Date} createdAt Date when the comment was created
 * @param {Schema.Types.ObjectId} creator Creator of the comment
 * @param {Schema.Types.ObjectId} post Post to which the comment has been made
 * @param {Schema.Types.ObjectId} likedBy Liked by whom
 * @param {Number} likeCount No of likes
 * @param {string} status whether the comment is active, blocked or deleted.
 */
const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "BLOCKED", "DELETED"],
    default: "ACTIVE",
  },
});

const CommentModel = () => model<Interface_Comment>("Comment", commentSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const Comment = (models.Comment || CommentModel()) as ReturnType<
  typeof CommentModel
>;
