import { Schema, model } from "mongoose";
import { UserModel } from "./UserModel.js";
import { AddressModel } from "./AddressModel.js";

const ThreadSchema = new Schema(
  {
    addressId: {
      type: Schema.Types.ObjectId, // Objekt-ID für die Adresse
      ref: "AddressModel", // Verweist auf das Address-Modell
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId, // Objekt-ID für die Kategorie
      ref: "UserModel", // Verweist auf das Category-Modell
      required: true,
    },

    title: {
      type: String, // Titel des Threads
      required: true,
      trim: true,
    },

    messages: [
      {
        type: Schema.Types.ObjectId, // Objekt-ID für eine Nachricht
        ref: "MessageModel", // Verweist auf das Message-Modell
      },
    ],

    createdFromUserId: {
      type: Schema.Types.ObjectId, // Verweis auf den Benutzer, der den Thread erstellt hat
      ref: "UserModel", // Verweist auf das User-Modell
      required: true,
    },

    closedAt: {
      type: Date, // Datum, an dem der Thread geschlossen wurde (optional)
      default: null,
    },
  },
  {
    timestamps: true, // Mongoose kümmert sich um createdAt und updatedAt})
  }
);

const ThreadModel = model("threads", ThreadSchema);

export default ThreadModel;
