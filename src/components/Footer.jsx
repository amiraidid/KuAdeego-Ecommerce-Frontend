import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, SimpleGrid, Stack, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box className="bg-gray-800 text-gray-300 py-8">
      <SimpleGrid  templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} spacing={8} maxW="6xl" mx="auto" px={6}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Company</Text>
          <Stack spacing={2}>
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Press</Link>
            <Link href="#">Blog</Link>
          </Stack>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Help</Text>
          <Stack spacing={2}>
            <Link href="#">Customer Service</Link>
            <Link href="#">Returns</Link>
            <Link href="#">Product Guides</Link>
            <Link href="#">FAQs</Link>
          </Stack>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Shop</Text>
          <Stack spacing={2}>
            <Link to={'/men-section'}>Men</Link>
            <Link to={'/women-section'}>Women</Link>
            <Link to={'/kids-section'}>Kids</Link>
            <Link to={'products'}>Sale</Link>
          </Stack>
        </Box>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold" mb={4}>Follow Us</Text>
          <Stack direction="row" spacing={4} justify="center">
            <Icon as={FaFacebook} boxSize={6} />
            <Icon as={FaTwitter} boxSize={6} />
            <Icon as={FaInstagram} boxSize={6} />
          </Stack>
        </Box>
      </SimpleGrid>
      <Text textAlign="center" fontSize="sm" mt={8}>&copy; {new Date().getFullYear()} Ka-Adeego. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
