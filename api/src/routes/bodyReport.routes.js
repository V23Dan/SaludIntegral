import { Router } from "express";

import {
  crearReporte,
  obtenerReportesUsuario,
  obtenerReportePorId,
  eliminarReporte,
  obtenerUltimoReporte,
  calcularSoloIMC,
  calcularSoloGrasaCorporal,
} from "../controllers/bodyReport.controller.js";

import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

router.use(verifyToken);

// Crear nuevo reporte corporal completo
router.post("/", crearReporte);

// Obtener todos los reportes del usuario autenticado
router.get("/", obtenerReportesUsuario);

// Obtener el último reporte del usuario
router.get("/ultimo", obtenerUltimoReporte);

// Calcular solo IMC (sin guardar en BD)
router.get("/calcular-imc", calcularSoloIMC);

// Calcular solo porcentaje de grasa corporal (sin guardar en BD)
router.get("/calcular-grasa", calcularSoloGrasaCorporal);

// Obtener reporte específico por ID
router.get("/:id", obtenerReportePorId);

// Eliminar reporte específico
router.delete("/:id", eliminarReporte);

export default router;
