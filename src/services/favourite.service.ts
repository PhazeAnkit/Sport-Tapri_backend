import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";

type userToken = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

const favouriteService = {
  async getFavourites(user: userToken) {
    if (!user.sub) throw new Error("Unauthorized User");
    try {
      const favouriteMatches = await prisma.favourites.findMany({
        where: { userId: user.sub },
        select: {
          match: true,
        },
      });
      return favouriteMatches;
    } catch (error: any) {
      throw new Error("Error in Fetching Data");
    }
  },
  async markFavourite(user: userToken, matchId: string) {
    if (!user?.sub) {
      throw new Error("Unauthorized");
    }

    try {
      const favourite = await prisma.favourites.create({
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
      const result = await prisma.favourites.deleteMany({
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
};

export default favouriteService;
