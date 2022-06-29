import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const setPlayState = (value) => {
    setPlaying(value);
  };
  const toogleShuffleState = () => {
    setShuffle(!shuffle);
  };
  const toogleRepeatState = () => {
    setRepeat(!repeat);
  };

  return (
    <Box width="100%">
      <Box>{/* <ReactHowler playing={playing} src={activeSong?.url} /> */}</Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            fontSize="20px"
            icon={<MdShuffle />}
            color={shuffle ? "#1db954" : "gray.600"}
            outline="none"
            onClick={() => {
              toogleShuffleState();
            }}
            variant="link"
          />
          <IconButton
            aria-label="previous"
            fontSize="20px"
            icon={<MdSkipPrevious />}
            outline="none"
            variant="link"
          />
          {playing ? (
            <IconButton
              aria-label="pause"
              fontSize="42px"
              icon={<MdPauseCircleFilled />}
              onClick={() => setPlayState(false)}
              outline="none"
              variant="link"
            />
          ) : (
            <IconButton
              aria-label="play"
              fontSize="42px"
              icon={<MdPlayCircleFilled />}
              onClick={() => setPlayState(true)}
              outline="none"
              variant="link"
            />
          )}
          <IconButton
            aria-label="next"
            fontSize="20px"
            icon={<MdSkipNext />}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="repeat"
            fontSize="20px"
            icon={<MdOutlineRepeat />}
            color={repeat ? "#1db954" : "gray.600"}
            onClick={() => {
              toogleRepeatState();
            }}
            outline="none"
            variant="link"
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={321}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">3:21</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
