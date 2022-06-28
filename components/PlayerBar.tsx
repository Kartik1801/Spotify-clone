import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import Player from "./Player";

const PlayerBar = () => {
  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        <Flex direction="row" width="30%">
          <Box paddingY="20px">
            <Image
              verticalAlign="center"
              height="44px"
              src="https://picsum.photos/400?}"
              boxShadow="dark-lg"
            />
          </Box>
          <Box paddingY="23px" paddingX="10px" color="white">
            <Text fontSize="large">SongName</Text>
            <Text fontSize="sm">Artist</Text>
          </Box>
        </Flex>
        <Box width="40%">
          <Player songs={undefined} activeSong={undefined} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
