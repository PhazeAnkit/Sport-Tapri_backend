import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import favouriteController from "../controllers/favourite.controller";

const router = Router();

router.get("/", auth, favouriteController.getFavourites);
router.post("/:matchId", auth, favouriteController.markFavourite);
router.delete('/:favouriteId',auth,favouriteController.unmarkFavourite)
export default router;
