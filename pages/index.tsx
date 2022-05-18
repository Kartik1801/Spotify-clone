import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist, Song } from "@prisma/client";
import { FC } from "react";
import {
  MdPlayCircleFilled,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import GradientLayout from "../components/GradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

interface HomeProps {
  artists: Artist[];
  songs: Song[];
}

const Home: FC<HomeProps> = ({ artists, songs }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      roundImage
      image="https://i.pinimg.com/originals/16/b8/26/16b826ca6cd8935c59a086bed5419640.jpg"
      subtitle="profile"
      color="red"
      title="KD"
      description="15 Followers &#8226; 3 Playlists"
    >
      <Box paddingLeft="5px" color="white">
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
            <Box padding="10px" width="192.8px" height="270.8px">
              <Box
                bg="#212121"
                width="100%"
                height="100%"
                borderRadius="4px"
                padding="15px"
              >
                <Image
                  src="https://placekitten.com/300/300"
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
                    height="50px"
                    src="https://placekitten.com/300/300"
                    boxShadow="dark-lg"
                  />
                </Box>
                <Box paddingX="15px" padding="5px">
                  <Text fontSize="16px">{song.name}</Text>
                  <Text fontSize="14px" color="gray.700">
                    {artists[song.artistId - 1].name}
                  </Text>
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

export const getServerSideProps = async () => {
  const artists: Artist[] = await prisma.artist.findMany({});
  const songs: Song[] = await prisma.song.findMany({});
  return {
    props: {
      artists,
      songs,
    },
  };
};

export default Home;
