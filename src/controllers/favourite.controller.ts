import { Request, Response } from "express";
import favouriteService from "../services/favourite.service";
import { error } from "node:console";

const favouriteController = {
  async getFavourites(req: Request, res: Response) {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "User not authorized Access denied" });

    try {
      const favourites = await favouriteService.getFavourites(user.sub);

      return res.status(200).json({
        success: true,
        data: favourites,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Failed to fetch favourites",
      });
    }
  },
  async markFavourite(req: Request, res: Response) {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "User not authorized Access denied" });

    const { matchId } = req.params;

    if (!matchId) {
      return res.status(400).json({
        success: false,
        message: "matchId is required",
      });
    }

    try {
      const result = await favouriteService.markFavourite(user, matchId);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to mark favourite",
      });
    }
  },
  async unmarkFavourite(req: Request, res: Response) {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "User not authorized Access denied" });

    const { favouriteId } = req.params;

    if (!favouriteId) {
      return res.status(400).json({
        success: false,
        message: "favouriteId is required",
      });
    }

    try {
      const result = await favouriteService.deleteFavourite(user, favouriteId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to unmark favourite",
      });
    }
  },
};

export default favouriteController;
