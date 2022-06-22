import { Table, Thead, Tbody, Td, Tr, Th, IconButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import formatDuration from "format-duration";
import { formatDate, formatTime } from "../lib/formatter";

const SongTable = ({ songs }) => {
  return (
    <Box padding="10px" margin="20px">
      <Table color="white" variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
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
              cursor="default"
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
  );
};

export default SongTable;
