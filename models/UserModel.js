import { Schema, model } from "mongoose";
import { RoleModel } from "./RoleModel.js";
import { AddressModel } from "./AddressModel.js";
import { FileModel } from "./FileModel.js";
import { ThreadModel } from "./ThreadModel.js";

const urlPattern =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

const UserSchema = new Schema(
  {
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "RoleModel", // Verweist auf das Role-Modell
      // required: true,
      // default: ""
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    userName: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already in use"],
    },

    password: {
      type: String,
      required: [true, "Please provide an password"],
      select: false,
    },

    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "addrresses",
        model: AddressModel,
      },
    ],

    tokens: [
      {
        accessToken: {
          type: String,
          required: true,
        },
      },
    ],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    images: {
      type: Schema.Types.ObjectId,
      ref: "files",
    },

    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: "threads",
        model: ThreadModel,
      },
    ],

    profilImageId: {
      type: Schema.Types.ObjectId,
      ref: "FileModel", // Verweist auf das File-Modell
    },

    isAccountDeleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("users", UserSchema);
export default UserModel;
