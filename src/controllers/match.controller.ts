import { Request, Response } from "express";
import matchesService from "../services/match.service";

const matchesController = {
  async getMatches(req: Request, res: Response) {
    try {
      const cursor = req.query.cursor as string | undefined;
      const limit = Math.min(Number(req.query.limit) || 20, 50);

      const userId = req.user?.sub;
      if (!userId)
        return res
          .status(401)
          .json({ error: "User not authorized Access denied" });

      const response = await matchesService.getMatches({
        cursor,
        limit,
        userId,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch matches",
      });
    }
  },
};

export default matchesController;
