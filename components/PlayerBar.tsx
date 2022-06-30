import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import Player from "./Player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong ? (
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
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </Box>
          </Flex>
        ) : null}
        <Box width="40%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
