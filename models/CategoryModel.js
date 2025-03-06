import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model("categories", CategorySchema);
export default CategoryModel;
