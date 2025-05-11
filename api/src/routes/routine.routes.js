import { Router } from "express";
import * as routineCtrl from "../controllers/routine.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

router.post('/create', verifyToken, routineCtrl.createRoutine);
router.get('/grouped', verifyToken ,routineCtrl.getGroupedByDificultad);
router.get('/projected', verifyToken, routineCtrl.getProjectedRutinas);
router.get('/sorted', verifyToken, routineCtrl.getSortedRutinas);
router.get('/filter', verifyToken, routineCtrl.getMatchedByDificultad);
router.get('/limit', verifyToken, routineCtrl.getLimitedRutinas);
router.get('/skip', verifyToken, routineCtrl.getSkippedRutinas);
router.get('/unwind', verifyToken, routineCtrl.getUnwindEjercicios);
router.get('/lookup', verifyToken, routineCtrl.getRutinasWithUserInfo);

export default router;