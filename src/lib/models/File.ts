import { Schema, model, Types, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface Interface_File {
  _id: Types.ObjectId;
  name: string;
  url: string | undefined;
  size: number | undefined;
  secret: string;
  createdAt: Date;
  contentType: string | undefined;
  status: string;
}
/**
 * @name fileSchema
 * @function
 * @description This is the structure of a file
 * @param {String} name Name
 * @param {String} url URL
 * @param {Number} size Size
 * @param {String} secret Secret
 * @param {Date} createdAt Created at Date
 * @param {String} contentType Content Type
 * @param {String} status Status
 */
const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  url: {
    type: String,
  },
  size: {
    type: Number,
  },
  secret: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  contentType: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "BLOCKED", "DELETED"],
    default: "ACTIVE",
  },
});

const FileModel = () => model<Interface_File>("File", fileSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const File = (models.File || FileModel()) as ReturnType<
  typeof FileModel
>;
