import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      type: String,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        reactionId: {
          type: Schema.Types.ObjectId,
          ref: "Reaction",
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
