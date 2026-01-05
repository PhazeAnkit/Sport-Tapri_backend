import { Router } from "express";
import teamsController from "../controllers/team.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/teamName",auth, teamsController.getTeamsFilter);

export default router;
