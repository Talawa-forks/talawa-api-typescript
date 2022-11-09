import { Schema, model, PopulatedDoc, Types, Document, models } from "mongoose";
import { Interface_DirectChatMessage } from "./DirectChatMessage";
import { Interface_Organization } from "./Organization";
import { Interface_User } from "./User";

export interface Interface_DirectChat {
  _id: Types.ObjectId;
  users: Array<PopulatedDoc<Interface_User & Document>>;
  messages: Array<PopulatedDoc<Interface_DirectChatMessage & Document>>;
  creator: PopulatedDoc<Interface_User & Document>;
  organization: PopulatedDoc<Interface_Organization & Document>;
  status: string;
}
/**
 * @name directChatSchema
 * @function
 * @description This is the Structure of the direct chat.
 * @param {Schema.Types.ObjectId} users Users of the chat
 * @param {Schema.Types.ObjectId} messages Messages
 * @param {Schema.Types.ObjectId} creator Creator of the chat
 * @param {Schema.Types.ObjectId} organization Organization
 * @param {String} status whether the chat is active, blocked or deleted.
 */
const directChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "DirectChatMessage",
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "BLOCKED", "DELETED"],
    default: "ACTIVE",
  },
});

const DirectChatModel = () =>
  model<Interface_DirectChat>("DirectChat", directChatSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const DirectChat = (models.DirectChat ||
  DirectChatModel()) as ReturnType<typeof DirectChatModel>;
