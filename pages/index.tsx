import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home = ({artists}) => {
  return <GradientLayout roundImage={true} image={"https://i.pinimg.com/originals/16/b8/26/16b826ca6cd8935c59a086bed5419640.jpg"} subtitle={"profile"} color={"red"} title={"KD"} description="15 Followers &#8226; 3 Playlists">
    <Box color="white">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Top Artists this month
          </Text>
          <Text fontSize="sm" color="gray.500" >
            Only visible to you.
          </Text>
        </Box>
        <Flex>
          {
            artists.map(artist => (
              <Box padding="10px" width="12%" >
                <Box bg="#212121" width="95%" borderRadius="4px" padding="15px" >
                  <Image src="https://placekitten.com/300/300" borderRadius="100%"  />   
                  <Box marginTop="10px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text>Artist </Text>
                  </Box>             
                </Box>
              </Box>
            ))
          }
        </Flex>
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
