import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const getUserInfo = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id).select("-pass");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Información del usuario obtenida correctamente",
      user,
    });
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al obtener información del usuario",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const { _id, nombre, apellido, correo, pass, tipoUsuario, roles } =
      req.body;

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updateData = {};

    if (nombre) updateData.nombre = nombre;
    if (apellido) updateData.apellido = apellido;

    if (correo && correo !== user.correo) {
      const emailExists = await User.findOne({ correo });
      if (emailExists) {
        return res
          .status(400)
          .json({ message: "El correo electrónico ya está en uso" });
      }
      updateData.correo = correo;
    }

    if (pass) {
      updateData.pass = pass;
    }

    if (tipoUsuario) updateData.tipoUsuario = tipoUsuario;
    if (roles) updateData.roles = roles;

    const updatedUser = await User.findByIdAndUpdate(token.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-pass");

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id).select("-pass");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};
