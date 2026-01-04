import {
  PrismaClient,
  SportType,
  MatchStatus,
  ResultType,
} from "../generated/prisma/client";
import { prisma } from "../db/prisma";

async function main() {

  const cricket = await prisma.sport.upsert({
    where: { slug: "cricket" },
    update: {},
    create: {
      name: "Cricket",
      slug: "cricket",
      sportType: SportType.TEAM,
    },
  });

  const leagueData = [
    { name: "The Ashes 2025-26", country: "Australia" },
    { name: "ICC Men's T20 World Cup 2026", country: "India & Sri Lanka" },
    { name: "Big Bash League | 15", country: "Australia" },
    { name: "SA20 2026", country: "South Africa" },
    { name: "New Zealand tour of India 2026", country: "India" },
  ];

  const leagues: Record<string, any> = {};
  for (const ld of leagueData) {
    leagues[ld.name] = await prisma.league.create({
      data: {
        name: ld.name,
        country: ld.country,
        currentSeason: "2025-26",
        sportId: cricket.id,
      },
    });
  }

  const teamConfigs = [
    {
      name: "India",
      country: "India",
      players: [
        "Suryakumar Yadav",
        "Shubman Gill",
        "Jasprit Bumrah",
        "Hardik Pandya",
        "Rishabh Pant",
      ],
    },
    {
      name: "Australia",
      country: "Australia",
      players: [
        "Pat Cummins",
        "Travis Head",
        "Mitchell Starc",
        "Glenn Maxwell",
        "Steve Smith",
      ],
    },
    {
      name: "England",
      country: "England",
      players: [
        "Harry Brook",
        "Joe Root",
        "Ben Stokes",
        "Jos Buttler",
        "Mark Wood",
      ],
    },
    {
      name: "South Africa",
      country: "South Africa",
      players: [
        "Aiden Markram",
        "Kagiso Rabada",
        "Heinrich Klaasen",
        "Quinton de Kock",
        "David Miller",
      ],
    },
    {
      name: "Pakistan",
      country: "Pakistan",
      players: [
        "Babar Azam",
        "Shaheen Afridi",
        "Mohammad Rizwan",
        "Naseem Shah",
        "Fakhar Zaman",
      ],
    },
    {
      name: "New Zealand",
      country: "New Zealand",
      players: [
        "Kane Williamson",
        "Rachin Ravindra",
        "Daryl Mitchell",
        "Trent Boult",
        "Mitchell Santner",
      ],
    },
    {
      name: "Sri Lanka",
      country: "Sri Lanka",
      players: [
        "Wanindu Hasaranga",
        "Pathum Nissanka",
        "Kusal Mendis",
        "Maheesh Theekshana",
        "Matheesha Pathirana",
      ],
    },
    {
      name: "West Indies",
      country: "West Indies",
      players: [
        "Nicholas Pooran",
        "Andre Russell",
        "Shai Hope",
        "Alzarri Joseph",
        "Rovman Powell",
      ],
    },
    {
      name: "Perth Scorchers",
      country: "Australia",
      players: [
        "Josh Inglis",
        "Ashton Turner",
        "Aaron Hardie",
        "Jhye Richardson",
        "Andrew Tye",
      ],
    },
    {
      name: "Sydney Sixers",
      country: "Australia",
      players: [
        "Sean Abbott",
        "Josh Philippe",
        "Ben Dwarshuis",
        "Daniel Hughes",
        "Jack Edwards",
      ],
    },
    {
      name: "MI Cape Town",
      country: "South Africa",
      players: [
        "Rashid Khan",
        "Kagiso Rabada",
        "Dewald Brevis",
        "Sam Curran",
        "Rassie van der Dussen",
      ],
    },
    {
      name: "Sunrisers Eastern Cape",
      country: "South Africa",
      players: [
        "Aiden Markram",
        "Marco Jansen",
        "Tristan Stubbs",
        "Simon Harmer",
        "Ottniel Baartman",
      ],
    },
    {
      name: "Brisbane Heat",
      country: "Australia",
      players: [
        "Usman Khawaja",
        "Marnus Labuschagne",
        "Matt Renshaw",
        "Michael Neser",
        "Spencer Johnson",
      ],
    },
    {
      name: "Adelaide Strikers",
      country: "Australia",
      players: [
        "Matthew Short",
        "Chris Lynn",
        "D'Arcy Short",
        "Jamie Overton",
        "Cameron Boyce",
      ],
    },
    {
      name: "Melbourne Stars",
      country: "Australia",
      players: [
        "Marcus Stoinis",
        "Glenn Maxwell",
        "Tom Rogers",
        "Beau Webster",
        "Usama Mir",
      ],
    },
  ];

  const teamMap: Record<string, string> = {};
  for (const tc of teamConfigs) {
    const team = await prisma.team.create({
      data: {
        name: tc.name,
        country: tc.country,
        sportId: cricket.id,
        leagueId: leagues["The Ashes 2025-26"].id, // Default league for ref
      },
    });
    teamMap[tc.name] = team.id;

    for (const pName of tc.players) {
      await prisma.participant.create({
        data: {
          name: pName,
          country: tc.country,
          sportId: cricket.id,
          teamId: team.id,
        },
      });
    }
  }

  const finished = [
    {
      home: "Australia",
      away: "England",
      venue: "MCG, Melbourne",
      date: "2025-12-26T10:30:00Z",
      hS: 245,
      aS: 248,
      winner: "England",
      league: "The Ashes 2025-26",
    },
    {
      home: "India",
      away: "South Africa",
      venue: "Ahmedabad",
      date: "2025-12-19T14:30:00Z",
      hS: 185,
      aS: 155,
      winner: "India",
      league: "ICC Men's T20 World Cup 2026",
    },
    {
      home: "Perth Scorchers",
      away: "Sydney Sixers",
      venue: "Perth Stadium",
      date: "2025-12-14T11:45:00Z",
      hS: 164,
      aS: 160,
      winner: "Perth Scorchers",
      league: "Big Bash League | 15",
    },
  ];

  for (const f of finished) {
    const m = await prisma.match.create({
      data: {
        sportId: cricket.id,
        leagueId: leagues[f.league].id,
        season: "2025-26",
        homeTeamId: teamMap[f.home],
        awayTeamId: teamMap[f.away],
        startTime: new Date(f.date),
        status: MatchStatus.FINISHED,
        venue: f.venue,
      },
    });
    await prisma.result.create({
      data: {
        matchId: m.id,
        homeScore: f.hS,
        awayScore: f.aS,
        winnerTeamId: teamMap[f.winner],
        resultType: ResultType.SCORE,
      },
    });
  }

  const upcoming = [
    {
      home: "Australia",
      away: "England",
      date: "2026-01-04T05:00:00Z",
      venue: "SCG, Sydney",
      league: "The Ashes 2025-26",
    },
    {
      home: "India",
      away: "New Zealand",
      date: "2026-01-11T08:00:00Z",
      venue: "Vadodara, India",
      league: "New Zealand tour of India 2026",
    },
    {
      home: "MI Cape Town",
      away: "Sunrisers Eastern Cape",
      date: "2026-01-04T13:30:00Z",
      venue: "Cape Town",
      league: "SA20 2026",
    },
    {
      home: "India",
      away: "Pakistan",
      date: "2026-02-15T14:00:00Z",
      venue: "Eden Gardens, Kolkata",
      league: "ICC Men's T20 World Cup 2026",
    },
  ];

  for (const u of upcoming) {
    await prisma.match.create({
      data: {
        sportId: cricket.id,
        leagueId: leagues[u.league].id,
        season: "2025-26",
        homeTeamId: teamMap[u.home],
        awayTeamId: teamMap[u.away],
        startTime: new Date(u.date),
        status: u.date.includes("2026-01-04")
          ? MatchStatus.LIVE
          : MatchStatus.SCHEDULED,
        venue: u.venue,
      },
    });
  }

  console.log(
    "Success: Seeded 15 Teams, 75 Players, and 7 Matches across 5 Leagues."
  );
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
