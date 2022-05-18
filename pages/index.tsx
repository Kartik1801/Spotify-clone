import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist, Song } from "@prisma/client";
import { FC } from "react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

interface HomeProps {
  artists: Artist[];
  songs: Song[];
}

const Home: FC<HomeProps> = ({ artists, songs }) => {
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
        <Box marginBottom="10px">
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
                    Artist{" "}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
        <Box marginY="10px">
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
        <Flex overflowY="auto">{songs.map((song: Song) => song.name)}</Flex>
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
