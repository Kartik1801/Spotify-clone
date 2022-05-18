import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.900 0%, ${color}.800 5%, ${color}.900 20%, rgba(0,0,0,0.9) 45%)`}
    >
      <Flex paddingTop="20px" paddingBottom="30px" paddingX="30px" align="end">
        <Box paddingY="30px" paddingX="5px">
          <Image
            boxSize="220px"
            boxShadow="dark-lg"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box paddingX="25px" paddingY="20px" color="white" lineHeight="65px">
          <Text casing="uppercase" fontSize="12" fontWeight="700">
            {subtitle}
          </Text>
          <Text fontSize="94" fontWeight="700">
            {title}
          </Text>
          <Text marginTop="3px" fontSize="14" fontWeight="600">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="10px" paddingX="50px">
        {children}
      </Box>
    </Box>
  );
};

export default GradientLayout;
