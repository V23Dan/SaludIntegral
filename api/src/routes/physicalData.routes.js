import { Router } from "express";

import { registerPhysicalData, getPhysicalData, updatePhysicalData } from "../controllers/physicalData.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

router.post("/register", verifyToken, registerPhysicalData);
router.get("/get", verifyToken, getPhysicalData);
router.put("/update", verifyToken, updatePhysicalData);

export default router;