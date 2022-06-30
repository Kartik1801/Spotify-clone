import {
  Table,
  Thead,
  Tbody,
  Td,
  Flex,
  Tr,
  Th,
  IconButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { MdPlayArrow, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatDate, formatTime } from "../lib/formatter";

const SongTable = ({ songs, playlist, user }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };
  return (
    <Box width="100%" height="100%" paddingY="15px" bgColor="rgba(0,0,0,0.1)">
      <Flex padding="10px" align="center" height="60px">
        <Box width="60px">
          <IconButton
            aria-label="play"
            color="black"
            bg="#1db954"
            height="56px"
            width="56px"
            onClick={() => handlePlay()}
            sx={{
              transition: "all .3s",
              "&:hover": {
                bg: "#20cf5e",
                height: "58px",
                width: "58px",
              },
            }}
            isRound
            icon={<MdPlayArrow fontSize="32px" />}
          />
        </Box>
        <Box marginLeft="20px">
          <IconButton
            aria-label="favourite"
            bg="none"
            variant="unstyled"
            color="#1db954"
            sx={{
              transition: "all .3s",
              "&:hover": {
                bg: "none",
                color: "#20cf5e",
              },
            }}
            icon={
              playlist.userId === user.id ? (
                <MdFavorite fontSize="30px" />
              ) : (
                <MdFavoriteBorder fontSize="30px" />
              )
            }
          />
        </Box>
      </Flex>
      <Box padding="10px" marginTop="20px">
        <Table color="white" variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th fontSize="lg">#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th fontSize="lg">
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                key={song.id}
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick = {()=> handlePlay(song)}
                cursor="pointer"
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongTable;
