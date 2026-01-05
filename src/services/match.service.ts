import { prisma } from "../db/prisma";

type GetMatchesInput = {
  cursor?: string;
  limit: number;
  userId: string;

  sportId?: string;
  leagueId?: string;
  teamId?: string;
  fromDate?: string;
  toDate?: string;
};

const matchesService = {
  async getMatches({
    cursor,
    limit,
    userId,
    sportId,
    leagueId,
    teamId,
    fromDate,
    toDate,
  }: GetMatchesInput) {
    const where: any = {
      ...(sportId && { sportId }),
      ...(leagueId && { leagueId }),

      ...(teamId && {
        OR: [
          { homeTeamId: teamId },
          { awayTeamId: teamId },
        ],
      }),

      ...(fromDate || toDate
        ? {
            startTime: {
              ...(fromDate && { gte: new Date(fromDate) }),
              ...(toDate && { lte: new Date(toDate) }),
            },
          }
        : {}),

      ...(cursor && {
        startTime: {
          gt: new Date(cursor),
        },
      }),
    };

    const matches = await prisma.match.findMany({
      where,

      orderBy: {
        startTime: "asc",
      },

      take: limit + 1, // limit + 1 to detect hasMore

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

        //favourite check (one-hit)
        favourites: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const hasMore = matches.length > limit;
    const data = hasMore ? matches.slice(0, limit) : matches;
    const lastMatch = data[data.length - 1];

    return {
      data: data.map((match) => {
        const favourite = match.favourites[0];

        return {
          id: match.id,
          startTime: match.startTime.toISOString(),
          status: match.status,

          sport: match.sport,
          league: match.league,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          result: match.result ?? undefined,

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
