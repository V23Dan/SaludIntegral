import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.ObjectId,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    documento: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
    },
    tipoUsuario: {
      type: String,
      required: true,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }] 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
