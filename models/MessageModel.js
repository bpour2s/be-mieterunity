import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel.js";
import { ReactionModel } from "./ReactionModel.js";
import { ThreadModel } from "./ThreadModel.js";

const MessageSchema = new Schema(
  {
    thread: {
      type: Schema.Types.ObjectId,
      ref: "threads",
      model: ThreadModel,
      required: true,
    },

    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      model: UserModel,
      required: true,
    },

    toUserId: {
      type: Schema.Types.ObjectId,
      model: UserModel,
      ref: "users",
    },

    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reactions",
        model: ReactionModel,
      },
    ],

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["unread", "read", "seen", "not_seen", "answered", "not_answered"],
      default: "unread",
    },
  },
  {
    timestaps: true,
  }
);

const MessageModel = model("messages", MessageSchema);
export default MessageModel;
