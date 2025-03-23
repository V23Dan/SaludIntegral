import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = "clave-secreta";

export const getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    console.log("token: ----- ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No hay token de autenticación",
      });
    }

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findById(decoded.id).select("-pass");

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
