import React from 'react';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import FadeInObserve from '../../components/FadeInObserve';

const NewsletterSection = () => {
  return (
    <FadeInObserve>
      <Box className="py-12 bg-blue-600 text-white text-center max-sm:mx-5 fadeIn">
        <Text fontSize="3xl" fontWeight="bold" mb={4}>Stay Updated</Text>
        <Text fontSize="md" mb={6}>Sign up for our newsletter to receive the latest news and exclusive offers.</Text>
        <Box className="flex flex-col md:flex-row items-center justify-center max-w-lg mx-auto">
          <Input 
            placeholder="Enter your email" 
            size="lg" 
            variant="filled" 
            className="mb-4 md:mb-0 md:mr-4" 
          />
          <Button colorScheme="yellow" size="lg">Subscribe</Button>
        </Box>
      </Box>
    </FadeInObserve>
  );
};

export default NewsletterSection;
