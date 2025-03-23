import { Router } from "express";
import { getUserInfo } from "../controllers/user.controller.js";

const router = Router();

router.get("/getInfoUser", getUserInfo);

export default router;
