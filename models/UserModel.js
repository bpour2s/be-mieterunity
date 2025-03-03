import { Schema, model } from "mongoose";
import { RoleModel } from "./RoleModel.js";
import { AddressModel } from "./AddressModel.js";
import { FileModel } from "./FileModel.js";
import { ThreadModel } from "./ThreadModel.js";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlPattern =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const locationsObject = new Schema({
      addressRefId: {
        type: Schema.Types.ObjectId,
        ref: "AddressModel",

      },

    });

     const threadsObject = new Schema({
      threadRefId: {
      type: Schema.Types.ObjectId,
      ref: "ThreadModel", // Verweist auf das Thread-Modell

      }

    });


const UserSchema = new Schema(
  {
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "RoleModel", // Verweist auf das Role-Modell
      required: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    userName: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already in use"],
      match: [emailPattern, "Email not valid"],
    },

    password: {
      type: String,
      required: true,
      select: false,
      match: [passwordPattern, "Please provide a proper password"],
    },

    
    locations : [locationsObject],
  

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
  type: String,
      default:
  "https://res.cloudinary.com/dvniua4ab/image/upload/c_crop,h_200,q_63,r_30,w_200/v1738597956/doh3dd3gliqihwvudapz.avif",
    match: [urlPattern, "Please provide a proper URL"],
    },

threads: [threadsObject],
 

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
