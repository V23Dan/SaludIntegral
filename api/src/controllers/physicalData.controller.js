import PhysicalData from "../models/physicalData.js";
import User from "../models/User.js";

export const registerPhysicalData = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id).select("-pass");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const existingData = await PhysicalData.findOne({ usuario: user._id });
    if (existingData) {
      return res.status(400).json({
        success: false,
        message: "Ya has registrado tus datos físicos.",
      });
    }

    const { sexo, altura, peso, edad } = req.body;

    const newPhysicalData = new PhysicalData({
      sexo,
      altura,
      peso,
      edad,
      usuario: user._id,
    });

    const savedData = await newPhysicalData.save();

    user.datosFisicos = savedData._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Datos físicos registrados exitosamente.",
      data: savedData,
    });
  } catch (error) {
    console.error("Error al registrar datos físicos:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

export const getPhysicalData = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const data = await PhysicalData.findOne({ usuario: user._id });
    console.log("Datos fisicos del usuario: ", data);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Datos físicos no encontrados" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al consultar datos físicos:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const updatePhysicalData = async (req, res) => {
  try {
    const token = req.user;

    const user = await User.findById(token.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const { sexo, altura, peso, edad } = req.body;

    const updatedData = await PhysicalData.findOneAndUpdate(
      { usuario: user._id },
      { sexo, altura, peso, edad },
      { new: true }
    );

    if (!updatedData) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Datos físicos no encontrados para actualizar",
        });
    }

    res.status(200).json({
      success: true,
      message: "Datos físicos actualizados exitosamente",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error al actualizar datos físicos:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
