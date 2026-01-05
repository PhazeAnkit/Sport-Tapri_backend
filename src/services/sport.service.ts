import { prisma } from "../db/prisma";

const sportsService = {

  async getSports() {
    const sports = await prisma.sport.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sportType: true,
        isActive: true,

        _count: {
          select: {
            leagues: true,
            matches: {
              where: {
                startTime: {
                  gt: new Date(),
                },
              },
            },
          },
        },
      },
    });

    return sports.map((sport) => ({
      id: sport.id,
      name: sport.name,
      slug: sport.slug,
      sportType: sport.sportType,
      isActive: sport.isActive,

      leaguesCount: sport._count.leagues,
      upcomingMatchesCount: sport._count.matches,
    }));
  },
   async getSportsFilter() {
    return prisma.sport.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  },
};

export default sportsService;
