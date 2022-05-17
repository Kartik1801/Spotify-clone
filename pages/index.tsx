import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home = ({artists}) => {
  return <GradientLayout roundImage={true} image={"https://i.pinimg.com/originals/16/b8/26/16b826ca6cd8935c59a086bed5419640.jpg"} subtitle={"profile"} color={"red"} title={"KD"} description="15 Followers &#8226; 3 Playlists">
    <Box paddingLeft="5px" color="white">
        <Box marginBottom="10px">
          <Text fontSize="24px" fontWeight="bold">
            Top artists this month
          </Text>
          <Text paddingLeft="2px" fontSize="sm" color="gray.500" >
            Only visible to you.
          </Text>
        </Box>
        <Flex overflowX="auto">
          {
            artists.map(artist => (
              <Box padding="10px" width="192.8px" height="270.8px" >
                <Box bg="#212121" width="100%" height="100%" borderRadius="4px" padding="15px" >
                  <Image src="https://placekitten.com/300/300" boxShadow="dark-lg" borderRadius="100%"  />   
                  <Box marginTop="20px">
                    <Text fontSize="16px" fontWeight="700">{artist.name}</Text>
                    <Text fontSize="15px" fontWeight="400" color="gray.500">Artist </Text>
                  </Box>             
                </Box>
              </Box>
            ))
          }
        </Flex>
        <Box marginY="10px">
          <Text fontSize="24px" fontWeight="bold">
            Top tracks this month
          </Text>
          <Text paddingLeft="2px" fontSize="sm" color="gray.500" >
            Only visible to you.
          </Text>
        </Box>
    </Box>
  </GradientLayout>;
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: {
      artists
    },
  }
}

export default Home;
