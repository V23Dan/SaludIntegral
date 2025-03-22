import mongoose from "mongoose";
import user from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, documento, pass, tipoUsuario } = req.body;
    console.log("Datos recibidos: ", req.body);

    const newUser = new user({
      nombre,
      apellido,
      correo,
      documento,
      pass,
      tipoUsuario,
    });

    await newUser.save(); //Guardar información del usuario

    console.log("Se agregó el usuario: ", newUser.nombre);
    console.log("con documento: " + newUser.documento);

    // Agregar una respuesta al cliente
    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      usuario: newUser,
    });
  } catch (error) {
    console.log("Error: ", error);
    // Responder con un error al cliente
    res.status(400).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { correo, pass } = req.body;
  console.log("Datos recibidos del login", req.body);

  try {
    const existingUser = await user.findOne({ correo });
    console.log("Uuario encontrado con correo: ", existingUser.correo);

    if (!existingUser) {
      return res
        .status(400)
        .json({ 
          success: false,
          message: "Correo o contraseña incorrectos" 
        });
    }

    if (pass !== existingUser.pass) {
      return res
        .status(400)
        .json({ message: "Documento o contraseña incorrectos" });
    }

    console.log("Usuario encontrado y logueandose");
    return res.json({
      success: true,
      message: "Usuario logueado",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al loguear usuario",
    });
  }
};

