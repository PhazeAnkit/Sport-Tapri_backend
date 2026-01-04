import {
  PrismaClient,
  SportType,
  MatchStatus,
  ResultType,
} from "../generated/prisma/client";
import { prisma } from "../db/prisma";

async function main() {
  const football = await prisma.sport.upsert({
    where: { slug: "football" },
    update: {},
    create: {
      name: "Football",
      slug: "football",
      sportType: SportType.TEAM,
    },
  });

  const leagueConfigs = [
    {
      name: "Premier League",
      country: "England",
      teams: [
        {
          name: "Arsenal",
          players: [
            "Declan Rice",
            "Martin Ødegaard",
            "Bukayo Saka",
            "Gabriel Magalhães",
            "David Raya",
          ],
        },
        {
          name: "Manchester City",
          players: [
            "Erling Haaland",
            "Kevin De Bruyne",
            "Bernardo Silva",
            "Rodri",
            "Phil Foden",
          ],
        },
        {
          name: "Liverpool",
          players: [
            "Mohamed Salah",
            "Virgil van Dijk",
            "Trent Alexander-Arnold",
            "Alexis Mac Allister",
            "Luis Díaz",
          ],
        },
        {
          name: "Aston Villa",
          players: [
            "Ollie Watkins",
            "Emiliano Martínez",
            "John McGinn",
            "Morgan Rogers",
            "Leon Bailey",
          ],
        },
        {
          name: "Chelsea",
          players: [
            "Cole Palmer",
            "Enzo Fernández",
            "Nicolas Jackson",
            "Levi Colwill",
            "Reece James",
          ],
        },
      ],
    },
    {
      name: "La Liga",
      country: "Spain",
      teams: [
        {
          name: "Real Madrid",
          players: [
            "Kylian Mbappé",
            "Jude Bellingham",
            "Vinícius Júnior",
            "Federico Valverde",
            "Thibaut Courtois",
          ],
        },
        {
          name: "Barcelona",
          players: [
            "Lamine Yamal",
            "Robert Lewandowski",
            "Pedri",
            "Gavi",
            "Pau Cubarsí",
          ],
        },
        {
          name: "Atletico Madrid",
          players: [
            "Julián Álvarez",
            "Antoine Griezmann",
            "Marcos Llorente",
            "Jan Oblak",
            "Conor Gallagher",
          ],
        },
        {
          name: "Villarreal",
          players: [
            "Gerard Moreno",
            "Rafa Marín",
            "Alex Baena",
            "Pape Gueye",
            "Luiz Júnior",
          ],
        },
        {
          name: "Espanyol",
          players: [
            "Javi Puado",
            "Marko Dmitrović",
            "Leandro Cabrera",
            "Álvaro Aguado",
            "Walid Cheddira",
          ],
        },
      ],
    },
    {
      name: "Bundesliga",
      country: "Germany",
      teams: [
        {
          name: "Bayern Munich",
          players: [
            "Harry Kane",
            "Jamal Musiala",
            "Michael Olise",
            "Leroy Sané",
            "Joshua Kimmich",
          ],
        },
        {
          name: "Bayer Leverkusen",
          players: [
            "Florian Wirtz",
            "Victor Boniface",
            "Alejandro Grimaldo",
            "Jeremie Frimpong",
            "Granit Xhaka",
          ],
        },
        {
          name: "RB Leipzig",
          players: [
            "Xavi Simons",
            "Loïs Openda",
            "Benjamin Šeško",
            "David Raum",
            "Castello Lukeba",
          ],
        },
        {
          name: "Borussia Dortmund",
          players: [
            "Serhou Guirassy",
            "Julian Brandt",
            "Nico Schlotterbeck",
            "Gregor Kobel",
            "Jamie Gittens",
          ],
        },
        {
          name: "Eintracht Frankfurt",
          players: [
            "Omar Marmoush",
            "Hugo Ekitiké",
            "Mario Götze",
            "Kevin Trapp",
            "Robin Koch",
          ],
        },
      ],
    },
    {
      name: "Serie A",
      country: "Italy",
      teams: [
        {
          name: "Inter Milan",
          players: [
            "Lautaro Martínez",
            "Nicolò Barella",
            "Marcus Thuram",
            "Hakan Çalhanoğlu",
            "Alessandro Bastoni",
          ],
        },
        {
          name: "AC Milan",
          players: [
            "Christian Pulisic",
            "Rafael Leão",
            "Theo Hernández",
            "Mike Maignan",
            "Luka Modrić",
          ],
        },
        {
          name: "Juventus",
          players: [
            "Dušan Vlahović",
            "Kenan Yıldız",
            "Teun Koopmeiners",
            "Manuel Locatelli",
            "Gleison Bremer",
          ],
        },
        {
          name: "Napoli",
          players: [
            "Khvicha Kvaratskhelia",
            "Romelu Lukaku",
            "Scott McTominay",
            "Frank Anguissa",
            "Giovanni Di Lorenzo",
          ],
        },
        {
          name: "Roma",
          players: [
            "Paulo Dybala",
            "Artem Dovbyk",
            "Matías Soulé",
            "Lorenzo Pellegrini",
            "Evan Ndicka",
          ],
        },
      ],
    },
    {
      name: "Ligue 1",
      country: "France",
      teams: [
        {
          name: "PSG",
          players: [
            "Ousmane Dembélé",
            "Vitinha",
            "Bradley Barcola",
            "Warren Zaïre-Emery",
            "Marquinhos",
          ],
        },
        {
          name: "Marseille",
          players: [
            "Mason Greenwood",
            "Pierre-Emerick Aubameyang",
            "Adrien Rabiot",
            "Leonardo Balerdi",
            "Elye Wahi",
          ],
        },
        {
          name: "Monaco",
          players: [
            "Denis Zakaria",
            "Aleksandr Golovin",
            "George Ilenikhena",
            "Maghnes Akliouche",
            "Thilo Kehrer",
          ],
        },
        {
          name: "Lyon",
          players: [
            "Alexandre Lacazette",
            "Rayan Cherki",
            "Georges Mikautadze",
            "Corentin Tolisso",
            "Nemanja Matić",
          ],
        },
        {
          name: "Lille",
          players: [
            "Jonathan David",
            "Edon Zhegrova",
            "Angel Gomes",
            "Lucas Chevalier",
            "Bafodé Diakité",
          ],
        },
      ],
    },
  ];

  for (const config of leagueConfigs) {
    const league = await prisma.league.create({
      data: {
        name: config.name,
        country: config.country,
        currentSeason: "2025/26",
        sportId: football.id,
      },
    });

    const teamObjects = [];

    for (const teamData of config.teams) {
      const team = await prisma.team.create({
        data: {
          name: teamData.name,
          country: config.country,
          sportId: football.id,
          leagueId: league.id,
        },
      });
      teamObjects.push(team);

      // Add 5 Players per team
      for (const playerName of teamData.players) {
        await prisma.participant.create({
          data: {
            name: playerName,
            sportId: football.id,
            teamId: team.id,
            country: config.country,
            isActive: true,
          },
        });
      }
    }
  }

  console.log("Seeded 5 Leagues, 25 Teams, 125 Players, and Recent Matches.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
