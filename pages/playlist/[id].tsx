import {
  Playlist as PlaylistModel,
  User,
  Song as SongModel,
} from "@prisma/client";
import { FC } from "react";
import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

interface pl extends PlaylistModel {
  songs: [SongModel];
}

interface IPlaylist {
  playlist: pl;
  user: User;
}

const getBGColor = (id) => {
  const color = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];
  return color[id - 1] || color[Math.floor(Math.random() * color.length)];
};

const Playlist: FC<IPlaylist> = ({ playlist, user }) => {
  const color = getBGColor(playlist.id);

  return (
    <GradientLayout
      color={color}
      title={playlist.name || "No Name"}
      description={`   ${playlist.songs.length} songs`}
      roundImage={false}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      subtitle="playlist"
    >
      <SongTable user={user} playlist={playlist} songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let User;
  try {
    User = validateToken(req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const { id } = User;
  const [user, playlist] = await Promise.all([
    prisma.user.findUnique({ where: { id: +id } }),
    prisma.playlist.findFirst({
      where: {
        id: +query.id,
        userId: id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    }),
  ]);
  return {
    props: { playlist, user },
  };
};

export default Playlist;
