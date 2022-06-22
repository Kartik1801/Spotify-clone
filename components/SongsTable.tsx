import { Table, Thead, Tbody, Td, Tr, Th,IconButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

const SongTable = ({ songs }) => {
  return (
    <Box padding="10px" margin="20px">
      <Table variant="unstyled">
        <Thead  color="white" borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  );
};

export default SongTable;
