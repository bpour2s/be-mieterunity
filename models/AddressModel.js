//import { required } from "joi";
import { Schema, model } from "mongoose";

//const postalCodePattern = [/^\d{5}$/, "Postleitzahl muss 5 Ziffern enthalten"];

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
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
      //match: [postalCodePattern, "Postleitzahl muss 5 Ziffern enthalten"],
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
      min: -180,
      max: 180,
      message: "Longitude muss zwischen -180 und 180 liegen",
    },

    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
      message: "Latitude muss zwischen -90 und 90 liegen",
    },
  },
  {
    timestamps: true,
  }
);

export const AddressModel = model("address", AddressSchema);
export default AddressModel;
