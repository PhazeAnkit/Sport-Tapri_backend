import { Request, Response } from "express";
import matchesService from "../services/match.service";

const matchesController = {
  async getMatches(req: Request, res: Response) {
    try {
      const {
        cursor,
        sportId,
        leagueId,
        teamId,
        fromDate,
        toDate,
      } = req.query;

      const limit = Math.min(Number(req.query.limit) || 20, 50);

      const userId = req.user?.sub;
      if (!userId) {
        return res.status(401).json({
          error: "User not authorized",
        });
      }

      const response = await matchesService.getMatches({
        cursor: cursor as string | undefined,
        limit,
        userId,
        sportId: sportId as string | undefined,
        leagueId: leagueId as string | undefined,
        teamId: teamId as string | undefined,
        fromDate: fromDate as string | undefined,
        toDate: toDate as string | undefined,
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
