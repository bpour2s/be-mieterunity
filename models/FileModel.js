import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel.js";

const FileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalFileName: {
      type: String,
      trim: true,
    },

    storedFileName: {
      type: String,
      required: true,
      trim: true,
    },

    mimeType: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
    },

    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FileModel = model("files", FileSchema);
export default FileModel;
