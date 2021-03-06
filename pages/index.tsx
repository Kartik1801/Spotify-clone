import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist, Song, User } from "@prisma/client";
import { FC } from "react";
import {
  MdPlayCircleFilled,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import GradientLayout from "../components/GradientLayout";
import { validateToken } from "../lib/auth";
import { formatTime } from "../lib/formatter";
import prisma from "../lib/prisma";

interface HomeProps {
  user: User;
  artists: Artist[];
  songs: Song[];
}

const Home: FC<HomeProps> = ({ user, artists, songs }) => {
  return (
    <GradientLayout
      roundImage
      image="https://i.pinimg.com/originals/16/b8/26/16b826ca6cd8935c59a086bed5419640.jpg"
      subtitle="profile"
      color="red"
      title={`${user?.firstName} ${user?.lastName}`}
      description="15 Followers &#8226; 3 Playlists"
    >
      <Box bgColor="rgba(0,0,0,0.1)" padding="25px" color="white">
        <Box marginBottom="25px">
          <Text fontSize="24px" fontWeight="bold">
            Top artists this month
          </Text>
          <Text
            paddingLeft="2px"
            fontSize="sm"
            color="gray.500"
            fontWeight="500"
          >
            Only visible to you.
          </Text>
        </Box>
        <Flex overflowX="auto">
          {artists.map((artist) => (
            <Box
              padding="10px"
              key={artist.id}
              width="192.8px"
              height="270.8px"
            >
              <Box
                bg="#212121"
                width="100%"
                height="100%"
                borderRadius="4px"
                padding="15px"
              >
                <Image
                  src={`https://picsum.photos/400?random=${artist.id}`}
                  boxShadow="dark-lg"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="16px" fontWeight="700">
                    {artist.name}
                  </Text>
                  <Text fontSize="15px" fontWeight="500" color="gray.500">
                    Artist
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
        <Box marginY="25px">
          <Text fontSize="24px" fontWeight="bold">
            Top tracks this month
          </Text>
          <Text
            paddingLeft="2px"
            fontSize="sm"
            color="gray.500"
            fontWeight="500"
          >
            Only visible to you.
          </Text>
        </Box>
        <Flex overflowY="auto" flexDirection="column">
          {songs.map((song: Song, index: number) => {
            return index < 4 ? (
              <Flex
                key={song.id}
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255,0.1)",
                  },
                }}
                cursor="default"
                marginY="5px"
                paddingX="5px"
                paddingY="10px"
                alignItems="center"
                width="100%"
                height="56px"
              >
                <Box padding="10px" verticalAlign="center" marginRight="7px">
                  <Text fontSize="18px">{index + 1}</Text>
                </Box>
                <Box height="56px" paddingRight="5px">
                  <Image
                    verticalAlign="center"
                    marginY="6px"
                    height="44px"
                    src={`https://picsum.photos/400?random=${song.id}`}
                    boxShadow="dark-lg"
                  />
                </Box>
                <Box paddingX="15px" height="56px" padding="5px">
                  <Text fontSize="16px">{song.name}</Text>
                  <Text fontSize="14px" color="gray.700">
                    {artists[song.artistId - 1].name}
                  </Text>
                </Box>
                <Box marginLeft="auto" height="56px" padding="5px">
                  <Text paddingY="10px">{formatTime(song.duration)}</Text>
                </Box>
                <Box height="56px" marginLeft="15px" padding="5px">
                  <MdPlayCircleFilled color="forestgreen" fontSize="45px" />
                </Box>
                <Box />
              </Flex>
            ) : null;
          })}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN);
  const [user, artists, songs] = await Promise.all([
    prisma.user.findUnique({ where: { id: +id } }),
    prisma.artist.findMany({}),
    prisma.song.findMany({}),
  ]);
  return {
    props: {
      user,
      artists,
      songs,
    },
  };
};

export default Home;
