import { Router } from "express";
import matchesController from "../controllers/match.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/",auth, matchesController.getMatches);

export default router;
