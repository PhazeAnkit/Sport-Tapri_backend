import { prisma } from "../db/prisma";

const teamsService = {
  async getTeamsFilter(sportId?: string, leagueId?: string) {
    return prisma.team.findMany({
      where: {
        isActive: true,
        ...(sportId && { sportId }),
        ...(leagueId && { leagueId }),
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        shortName: true,
        leagueId: true,
      },
    });
  },
};

export default teamsService;
