import mongoose, { Schema } from "mongoose";

const rolUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Rol", required: true },
});

const RolUser = mongoose.model("RolUser", rolUserSchema);

export default RolUser;
