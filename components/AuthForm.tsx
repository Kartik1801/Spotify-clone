import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutation";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await auth(mode, { email, password, firstName, lastName });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white solid 1px"
      >
        <NextImage
          priority
          src="/logo.svg"
          height={80}
          width={160}
          layout="fixed"
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        className="fex"
        height="calc(100vh - 100px)"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <>
                <Input
                  type="text"
                  placeholder="Firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : null}
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              alignSelf="center"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.200",
                },
              }}
            >
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
