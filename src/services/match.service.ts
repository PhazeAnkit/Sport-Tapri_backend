import { prisma } from "../db/prisma";

type GetMatchesInput = {
  cursor?: string;
  limit: number;
  userId: string;
};

const matchesService = {
  async getMatches({ cursor, limit, userId }: GetMatchesInput) {
    const matches = await prisma.match.findMany({
      where: cursor
        ? {
            startTime: {
              gt: new Date(cursor),
            },
          }
        : undefined,

      orderBy: {
        startTime: "asc",
      },

      take: limit + 1,

      include: {
        sport: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        league: {
          select: {
            id: true,
            name: true,
            country: true,
          },
        },
        homeTeam: {
          select: {
            id: true,
            name: true,
            shortName: true,
            logoUrl: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            shortName: true,
            logoUrl: true,
          },
        },
        result: {
          select: {
            homeScore: true,
            awayScore: true,
          },
        },

        // KEY PART
        favourites: userId
          ? {
              where: {
                userId,
              },
              select: {
                id: true,
              },
            }
          : false,
      },
    });

    const hasMore = matches.length > limit;
    const data = hasMore ? matches.slice(0, limit) : matches;

    const lastMatch = data[data.length - 1];

    return {
      data: data.map((match) => {
        const favourite = match.favourites?.[0];

        return {
          id: match.id,
          startTime: match.startTime.toISOString(),
          status: match.status,

          sport: match.sport,
          league: match.league,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          result: match.result ?? undefined,

          // Favourite info
          isFavourite: !!favourite,
          favouriteId: favourite?.id ?? null,
        };
      }),

      nextCursor: hasMore ? lastMatch.startTime.toISOString() : null,
      hasMore,
    };
  },
};

export default matchesService;
