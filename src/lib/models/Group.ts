import { Schema, model, PopulatedDoc, Types, Document, models } from "mongoose";
import { Interface_Organization } from "./Organization";
import { Interface_User } from "./User";

export interface Interface_Group {
  _id: Types.ObjectId;
  title: string;
  description: string | undefined;
  createdAt: Date;
  organization: PopulatedDoc<Interface_Organization & Document>;
  status: string;
  admins: Array<PopulatedDoc<Interface_User & Document>>;
}
/**
 * @name groupSchema
 * @function
 * @description This is the structure of a group
 * @param {String} title Title
 * @param {String} description Description
 * @param {Date} createdAt Created at Date
 * @param {String} status Status
 * @param {Schema.Types.ObjectId[]} admins Admins
 */
const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const GroupModel = () => model<Interface_Group>("Group", groupSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const Group = (models.Group || GroupModel()) as ReturnType<
  typeof GroupModel
>;
