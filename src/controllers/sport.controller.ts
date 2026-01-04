import { Request, Response } from "express";
import sportsService from "../services/sport.service";

const sportsController = {
  async getSports(req: Request, res: Response) {
    try {
      const sports = await sportsService.getSports();

      return res.status(200).json({
        data: sports,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch sports",
      });
    }
  },
};

export default sportsController;
