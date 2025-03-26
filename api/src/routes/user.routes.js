import { Router } from "express";
import { getUserInfo, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

router.get("/getInfoUser", verifyToken, getUserInfo);

router.put("/updateUser", verifyToken, updateUser);

router.delete("/deleteUser", verifyToken, deleteUser);

export default router;
