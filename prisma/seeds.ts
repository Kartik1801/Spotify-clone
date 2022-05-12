import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./SongsData";
// creates a  new prisma client instance
const prisma = new PrismaClient();

// seeder function
const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          song: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );
};

const salt = bcrypt.genSaltSync();
const user = await prisma.user.upsert({
  where: { email: "user@test.com" },
  update: {},
  create: {
    name: "user",
    email: "user@test.com",
    password: bcrypt.hashSync(salt),
  },
});

const songs = await prisma.song.findMany({});
await Promise.all(
  new Array(10).fill(1).map(async (_, i) => {
    return prisma.playlist.create({
      data: {
        name: `playlist-no-${i + 1}`,
        user: {
          connect: { id: user.id },
        },
        song: {
          connect: songs.map((song) => {
            return { id: song.id };
          }),
        },
      },
    });
  })
);

run()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
