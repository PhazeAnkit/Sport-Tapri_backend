import {
  PrismaClient,
  SportType,
  MatchStatus,
  ResultType,
} from "../generated/prisma/client";
import { prisma } from "../db/prisma";

async function main() {
  const football = await prisma.sport.findUnique({
    where: { slug: "football" },
  });
  if (!football)
    throw new Error("Football sport not found. Please run initial seed first.");

  const leagues = await prisma.league.findMany({
    include: { teams: true },
  });

  console.log(`Found ${leagues.length} leagues. Processing matches...`);

  for (const league of leagues) {
    const teams = league.teams;
    if (teams.length < 2) continue;

    for (let i = 0; i < teams.length; i++) {
      const homeTeam = teams[i];

      const opponentFinished = teams[(i + 3) % teams.length];
      const opponentUpcoming = teams[(i + 4) % teams.length];

      const finishedMatch = await prisma.match.create({
        data: {
          sportId: football.id,
          leagueId: league.id,
          season: "2025/26",
          homeTeamId: homeTeam.id,
          awayTeamId: opponentFinished.id,
          startTime: new Date(2026, 0, 4, 12, 0), // Jan 4, 2026 (Past/Today)
          status: MatchStatus.FINISHED,
          venue: `${homeTeam.name} Arena`,
        },
      });

      const hScore = Math.floor(Math.random() * 4);
      const aScore = Math.floor(Math.random() * 3);

      await prisma.result.create({
        data: {
          matchId: finishedMatch.id,
          homeScore: hScore,
          awayScore: aScore,
          winnerTeamId:
            hScore > aScore
              ? homeTeam.id
              : aScore > hScore
              ? opponentFinished.id
              : null,
          resultType: ResultType.SCORE,
        },
      });

      await prisma.match.create({
        data: {
          sportId: football.id,
          leagueId: league.id,
          season: "2025/26",
          homeTeamId: homeTeam.id,
          awayTeamId: opponentUpcoming.id,
          startTime: new Date(2026, 0, 20 + i, 20, 0),
          status: MatchStatus.SCHEDULED, // Assuming SCHEDULED or UPCOMING exists in your Enum
          venue: `${homeTeam.name} Stadium`,
        },
      });
    }
  }

  console.log(
    "Success: Inserted additional played matches and new upcoming fixtures."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
