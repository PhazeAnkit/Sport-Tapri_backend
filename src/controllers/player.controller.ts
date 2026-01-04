import { Request, Response } from "express";
import playersService from "../services/player.service";

const playersController = {
  async getPlayers(req: Request, res: Response) {
    try {
      const cursor = req.query.cursor as string | undefined;
      const limit = Math.min(Number(req.query.limit) || 10, 50);

      const response = await playersService.getPlayers({
        cursor,
        limit,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch players",
      });
    }
  },
};

export default playersController;
