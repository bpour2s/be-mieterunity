import { Schema, model } from "mongoose";
import { RoleModel } from "./RoleModel.js";
import { AddressModel } from "./AddressModel.js";
import { FileModel } from "./FileModel.js";
import { ThreadModel } from "./ThreadModel.js";

const urlPattern =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

const UserSchema = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      model: RoleModel, // Verweist auf das Role-Modell
      // required: true,
      // default: ""
    },

    locations: [
      {
        type: String,
        // type: Schema.Types.ObjectId,
        // ref: "addrresses",
        // model: AddressModel,
      },
    ],

    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: "threads",
        model: ThreadModel,
      },
    ],

    profilImageId: {
      type: Schema.Types.ObjectId,
      ref: "files", // Verweist auf das File-Modell
      model: FileModel,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    tokens: [
      {
        accessToken: {
          type: String,
          required: true,
        },
      },
    ],

    isFirstLogin: {
      type: Boolean,
      default: true,
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

    lastLogin: {
      type: Date,
      default: null,
    },

    isAccountDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("users", UserSchema);
export default UserModel;
