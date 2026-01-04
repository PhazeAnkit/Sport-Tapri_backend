import { prisma } from "../db/prisma";

type GetPlayersInput = {
  cursor?: string;
  limit: number;
};

const playersService = {
  async getPlayers({ cursor, limit }: GetPlayersInput) {
    const players = await prisma.participant.findMany({
      take: limit + 1, // fetch extra row to detect hasMore

      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),

      orderBy: [
        { name: "asc" },
        { id: "asc" }, // tie-breaker
      ],

      select: {
        id: true,
        name: true,
        country: true,
        role: true,
        ranking: true,
        sport: {
          select: {
            id: true,
            name: true,
          },
        },
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const hasMore = players.length > limit;
    const data = hasMore ? players.slice(0, limit) : players;

    const lastPlayer = data[data.length - 1];

    return {
      data,
      nextCursor: hasMore ? lastPlayer.id : null,
      hasMore,
    };
  },
};

export default playersService;
