import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";

type userToken = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

const favouriteService = {
  async markFavourite(user: userToken, matchId: string) {
    if (!user?.sub) {
      throw new Error("Unauthorized");
    }

    try {
      const favourite = await prisma.favourite.create({
        data: {
          user: {
            connect: { id: user.sub },
          },
          match: {
            connect: { id: matchId }, // FK validation happens here
          },
        },
        select: {
          id: true,
        },
      });

      return { favouriteId: favourite.id };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            // unique constraint (userId + matchId)
            throw new Error("Match already marked as favourite");
          case "P2003":
            // foreign key constraint (invalid matchId)
            throw new Error("Match does not exist");
        }
      }
      throw new Error("Failed to mark favourite");
    }
  },
  async deleteFavourite(user: userToken, favouriteId: string) {
    if (!user?.sub) {
      throw new Error("Unauthorized");
    }

    try {
      const result = await prisma.favourite.deleteMany({
        where: {
          id: favouriteId,
          userId: user.sub, // ownership enforced here
        },
      });

      if (result.count === 0) {
        throw new Error("Favourite not found or not owned by user");
      }

      return { success: true };
    } catch {
      throw new Error("Failed to delete favourite");
    }
  },
  async getFavourites(userId: string) {
    const favourites = await prisma.favourite.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true, // favouriteId
        match: {
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
          },
        },
      },
    });

    return favourites.map((fav) => ({
      id: fav.id,
      match: {
        id: fav.match.id,
        startTime: fav.match.startTime.toISOString(),
        status: fav.match.status,

        sport: fav.match.sport,
        league: fav.match.league,
        homeTeam: fav.match.homeTeam,
        awayTeam: fav.match.awayTeam,
        result: fav.match.result ?? undefined,
      },
    }));
  },
};

export default favouriteService;
