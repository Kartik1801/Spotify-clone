import { Box, Flex, Text } from "@chakra-ui/layout";
import { Playlist as PlaylistModel, User } from "@prisma/client";
import { FC } from "react";
import {
  MdPlayCircleFilled,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

interface IPlaylist {
  playlist: PlaylistModel;
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
      <Box width="100%" height="100%" paddingX="15px" bgColor="rgba(0,0,0,0.1)">
        <Flex padding="10px">
          <Text height="65px" fontSize="65px" color="lightgreen">
            <MdPlayCircleFilled />
          </Text>
          <Text
            height="60px"
            paddingY="20px"
            paddingX="15px"
            align="center"
            fontSize="30px"
          >
            {playlist.userId === user.id ? (
              <MdFavorite color="lightgreen" />
            ) : (
              <MdFavoriteBorder />
            )}
          </Text>
        </Flex>
        <SongTable songs={playlist.songs} />
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN);
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
