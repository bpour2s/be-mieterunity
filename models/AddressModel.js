import { Schema, model } from "mongoose";

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trime: true,
    },

    houseNr: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "Germany",
      trim: true,
    },

    lon: {
      type: Number,
      required: true,
    },

    lat: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AddressModel = model("address", AddressSchema);
export default AddressModel;
