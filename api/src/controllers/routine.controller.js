import Routine from "../models/routine.js";
import User from "../models/User.js";

export const createRoutine = async (req, res) => {
  try {
    console.log("Entrando en el controlador de crear rutinas");
    const token = req.user;
    const user = await User.findById(token.id).select("-pass");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    console.log("Usuario encontrado: ", user);

    const { nombre, dificultad, duracion, ejercicios, fechaCreacion } =
      req.body;
    console.log("Datos traidos desde el front: ", req.body);

    const newRoutine = new Routine({
      nombre,
      dificultad,
      fechaCreacion,
      duracion,
      ejercicios,
      usuario: user._id,
    });

    console.log("Datos de la nueva rutina creados en el objeto");
    const savedRoutine = await newRoutine.save();
    console.log("Resultado de guardar rutina", savedRoutine);
    res.status(201).json(savedRoutine);
  } catch (error) {
    console.error("Error completo:", error);
    res
      .status(500)
      .json({ message: "Error al crear la rutina", error: error.message });
  }
};

export const getGroupedByDificultad = async (req, res) => {
  try {
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      {
        $group: {
          _id: "$dificultad",
          total: { $sum: 1 },
          promedioDuracion: { $avg: "$duracion" },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en agrupación", error });
  }
};

export const getProjectedRutinas = async (req, res) => {
  try {
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      {
        $project: {
          nombre: 1,
          dificultad: 1,
          duracion: 1,
          _id: 0,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en proyección", error });
  }
};

export const getSortedRutinas = async (req, res) => {
  try {
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      { $sort: { duracion: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al ordenar", error });
  }
};

export const getMatchedByDificultad = async (req, res) => {
  try {
    const dificultad = req.query.dificultad;
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id, dificultad } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar por dificultad", error });
  }
};

export const getLimitedRutinas = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      { $limit: limit },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en limitación", error });
  }
};

export const getSkippedRutinas = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      { $skip: skip },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en omisión", error });
  }
};

export const getUnwindEjercicios = async (req, res) => {
  try {
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      { $unwind: "$ejercicios" },
      { $project: { nombre: 1, dificultad: 1, ejercicio: "$ejercicios" } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en unwind", error });
  }
};

export const getRutinasWithUserInfo = async (req, res) => {
  try {
    const result = await Routine.aggregate([
      { $match: { usuario: req.user.id } },
      {
        $lookup: {
          from: "users",
          localField: "usuario",
          foreignField: "_id",
          as: "usuario_info",
        },
      },
      { $unwind: "$usuario_info" },
      {
        $project: {
          nombre: 1,
          dificultad: 1,
          "usuario_info.nombre": 1,
          "usuario_info.correo": 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al unir con usuario", error });
  }
};
