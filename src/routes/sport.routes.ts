import { Router } from "express";
import sportsController from "../controllers/sport.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, sportsController.getSports);
router.get("/sportName",auth, sportsController.getSportsFilter);

export default router;
