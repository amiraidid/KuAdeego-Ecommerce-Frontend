import React from "react";
import { Box, Button, Heading, Text, Image } from '@chakra-ui/react';
import shopping from "../../assets/shopping.jpg";

function Intro() {
  return (
    <div>
      <Box className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:px-20 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white" zIndex={1}>
        <Box className="flex flex-col space-y-4 max-w-lg md:mr-8 text-center md:text-left animate_fade">
          <Heading fontSize="4xl" fontWeight="bold" lineHeight="shorter">
            Welcome to Your Dream Store
          </Heading>
          <Text fontSize="lg" className="text-gray-200">
            Discover the latest trends in fashion, accessories, and more!
            Quality products, unbeatable prices, and a seamless shopping
            experience.
          </Text>
          <Button
            colorScheme="yellow"
            size="lg"
            className="mt-4 self-center md:self-start hover:animate-bounce duration-75 transition-all"
          >
           <a href="#latest"> Start Shopping </a>
          </Button>
        </Box>

        <Image
          src={shopping}
          alt="Intro Section Image"
          boxSize={{ base: "400px", md: "250px", lg: "400px" }}
          objectFit="cover"
          className="mt-8 md:mt-0 rounded-xl shadow-lg animate_fade"
        />
      </Box>
    </div>
  );
}

export default Intro;
