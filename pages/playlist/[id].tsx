import { Box, Flex, Text } from "@chakra-ui/layout";
import { Playlist as PlaylistModel } from "@prisma/client";
import { FC } from "react";
import {
  MdPlayCircleFilled,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import GradientLayout from "../../components/GradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

interface IPlaylist {
  playlist: PlaylistModel;
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

const Playlist: FC<IPlaylist> = ({ playlist }) => {
  const color = getBGColor(playlist.id);

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      description="Description"
      roundImage={false}
      image="https://placekitten.com/300/300"
      subtitle="playlist"
    >
      <Box
        width="100%"
        height="100%"
        paddingX={"15px"}
        bgColor={"rgba(0,0,0,0.1)"}
      >
        <Flex padding="10px">
          <Text height="65px" fontSize="65px" color="lightgreen">
            <MdPlayCircleFilled />
          </Text>
          <Text
            height="60px"
            paddingY="15px"
            paddingX="15px"
            align="center"
            fontSize="40px"
            color="lightgreen"
          >
            <MdFavorite />
          </Text>
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
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
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
