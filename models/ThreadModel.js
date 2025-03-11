import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel.js";
import { AddressModel } from "./AddressModel.js";
import { CategoryModel } from "./CategoryModel.js";

const ThreadSchema = new Schema(
  {
    addressId: {
      type: Schema.Types.ObjectId, // Objekt-ID für die Adresse
      ref: "addresses", // Verweist auf das Address-Modell
      model: AddressModel,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId, // Objekt-ID für die Kategorie
      ref: "categories", // Verweist auf das Category-Modell
      model: CategoryModel,
      required: true,
    },

    createdFromUserId: {
      type: Schema.Types.ObjectId, // Verweis auf den Benutzer, der den Thread erstellt hat
      ref: "users", // Verweist auf das User-Modell
      required: true,
    },

    title: {
      type: String, // Titel des Threads
      required: true,
      trim: true,
    },

    // messages: [messagesObject],

    closedAt: {
      type: Date, // Datum, an dem der Thread geschlossen wurde (optional)
      default: null,
    },
  },
  {
    timestamps: true, // Mongoose kümmert sich um createdAt und updatedAt})
  }
);

export const ThreadModel = model("threads", ThreadSchema);

export default ThreadModel;
