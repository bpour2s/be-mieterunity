import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    permissions: {
      type: [String], 
      enum: [
        // Optional: Stelle sicher, dass nur gültige Berechtigungen verwendet werden
        "read_messages",
        "write_messages",
        "delete_messages",
        "open_threads",
        "close_threads",
        "delete_threads",
        "manage_users",
      ],
      default: [], 
    },
  },
  {
    timestamps: true,
  }
);
export const RoleModel = mongoose.model("Role", roleSchema);

export default RoleModel;
