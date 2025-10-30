import React from "react";
import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function Success() {
  return (
    <div className="h-screen">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mt={20}
        mx={"auto"}
        bg="gray.50"
        p={6}
        w={"300px"}
        h={"300px"}
        rounded={"lg"}
      >
        <Box textAlign="center" mb={4}>
          <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" />
        </Box>
        <Heading as="h1" size="2xl" mb={4}>
          Success!
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Your order has been placed successfully.
        </Text>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => window.location.replace("/")}
        >
          Go to Home
        </Button>
      </Box>
    </div>
  );
}

export default Success;
