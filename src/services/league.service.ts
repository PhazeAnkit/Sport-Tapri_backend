import { prisma } from "../db/prisma";

type GetLeaguesInput = {
  cursor?: string;
  limit: number;
};

const leaguesService = {
  async getLeagues({ cursor, limit }: GetLeaguesInput) {
    const leagues = await prisma.league.findMany({
      take: limit + 1, // fetch one extra to detect hasMore

      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),

      orderBy: [
        { name: "asc" },
        { id: "asc" }, // tie-breaker for stable pagination
      ],

      select: {
        id: true,
        name: true,
        country: true,
        currentSeason: true,
        logoUrl: true,
        sport: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    const hasMore = leagues.length > limit;
    const data = hasMore ? leagues.slice(0, limit) : leagues;

    const lastLeague = data[data.length - 1];

    return {
      data,
      nextCursor: hasMore ? lastLeague.id : null,
      hasMore,
    };
  },
};

export default leaguesService;
