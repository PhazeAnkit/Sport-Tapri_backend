import { Router } from "express";
import leaguesController from "../controllers/league.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, leaguesController.getLeagues);
router.get("/leaguesName", auth, leaguesController.getLeaguesFilter);

export default router;
