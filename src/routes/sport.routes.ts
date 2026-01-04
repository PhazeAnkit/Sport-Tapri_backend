import { Router } from "express";
import sportsController from "../controllers/sport.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, sportsController.getSports);

export default router;
