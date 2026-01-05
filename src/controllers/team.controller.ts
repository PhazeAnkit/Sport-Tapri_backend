import { Request, Response } from "express";
import teamsService from "../services/team.service";

const teamsController = {
  async getTeamsFilter(req: Request, res: Response) {
    try {
      const { sportId, leagueId } = req.query;

      const teams = await teamsService.getTeamsFilter(
        sportId as string | undefined,
        leagueId as string | undefined
      );

      return res.status(200).json({
        data: teams,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch teams",
      });
    }
  },
};

export default teamsController;
