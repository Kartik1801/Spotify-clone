import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from  "@chakra-ui/react";

const GradientLayout = ({
    color,
    children,
    image,
    subtitle,
    title,
    description,
    roundImage
}) => {

    return (
        <Box height="100%" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.9) 75%)`} >
            <Flex bg={`${color}.600`} padding="40px" align="end" >
                hello
            </Flex>
        </Box>
    )
}

export default GradientLayout