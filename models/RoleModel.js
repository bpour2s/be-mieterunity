import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Optional: Stelle sicher, dass Rollennamen eindeutig sind
    },
    description: {
      type: String,
    },
    permissions: {
      type: [String], // Array von Strings
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
      default: [], // Standardmäßig keine Berechtigungen
    },
  },
  {
    timestamps: true,
  }
);
export const RoleModel = mongoose.model("Role", roleSchema);

export default RoleModel;
