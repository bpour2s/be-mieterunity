import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel.js";
import { ReactionModel } from "./ReactionModel.js";

const MessageSchema = new Schema(
  {
    message: {
      type: String,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    reactions: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "UserModel",
        },
        reactionId: {
          type: Schema.Types.ObjectId,
          ref: "ReactionModel",
        },

        status: {
          type: String,
          enum: [
            "unread",
            "read",
            "seen",
            "not_seen",
            "answered",
            "not_answered",
          ],
          default: "unread",
        },
      },
    ],
  },
  {
    timestaps: true,
  }
);

const MessageModel = model("messages", MessageSchema);
export default MessageModel;
