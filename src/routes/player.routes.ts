import { Router } from "express";
import playersController from "../controllers/player.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/",auth, playersController.getPlayers);

export default router;
