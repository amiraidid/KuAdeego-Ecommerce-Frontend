import React from 'react';
import { Box, Icon, Text, SimpleGrid } from '@chakra-ui/react';
import { FaShippingFast, FaHeadset, FaLock } from 'react-icons/fa';
import FadeInObserve from '../../components/FadeInObserve';


const FeaturesSection = () => {
  return (
    <FadeInObserve>
      <Box className="py-12">
        <SimpleGrid columns={[1, 2, 3]} spacing={8} maxW="6xl" mx="auto" px={6}>
          <FeatureCard 
            icon={FaShippingFast} 
            title="Free Shipping" 
            description="On all orders over $50" 
          />
          <FeatureCard 
            icon={FaHeadset} 
            title="24/7 Support" 
            description="We're here to help, anytime" 
          />
          <FeatureCard 
            icon={FaLock} 
            title="Secure Payment" 
            description="Your information is safe with us" 
          />
        </SimpleGrid>
      </Box>
    </FadeInObserve>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Box className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
    <Icon as={icon} boxSize={10} color="blue.500" />
    <Text fontSize="lg" fontWeight="bold" mt={2}>{title}</Text>
    <Text fontSize="sm" color="gray.600">{description}</Text>
  </Box>
);

export default FeaturesSection;
