import { Schema, model } from "mongoose";

const ReactionSchema = new Schema(
  {
    symbol: {
      type: String,
      trim: true,
    },

    text: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReactionModel = model("reactions", ReactionSchema);
export default ReactionModel;
