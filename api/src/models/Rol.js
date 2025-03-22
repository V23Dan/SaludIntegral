import mongoose, { Schema } from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    idRol: {
      type: Schema.ObjectId,
      required: true,
    },
    nameRol: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rol = mongoose.model("Rol", rolSchema);

export default Rol;
