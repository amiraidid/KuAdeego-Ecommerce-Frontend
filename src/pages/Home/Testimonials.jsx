import React from 'react';
import { Box, Text, SimpleGrid, Avatar, Stack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import FadeInObserve from '../../components/FadeInObserve';

const TestimonialCard = ({ name, review, rating, avatar }) => (
  <Box className="p-6 bg-white rounded-lg shadow-lg text-center">
    <Avatar src={avatar} name={name} size="lg" mb={4} mx="auto" />
    <Text fontSize="lg" fontWeight="bold">{name}</Text>
    <Stack direction="row" justify="center" mt={2}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} color={i < rating ? "yellow.400" : "gray.300"} />
      ))}
    </Stack>
    <Text fontSize="sm" mt={2} color="gray.600">{review}</Text>
  </Box>
);

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'John Doe', review: 'Great quality and fast delivery!', rating: 5, avatar: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', review: 'I love the products!', rating: 4, avatar: 'https://via.placeholder.com/100' },
  ];

  return (
    <FadeInObserve>
      <Box className="py-12">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8}>What Our Customers Say</Text>
        <SimpleGrid columns={[1, 2]} spacing={8} maxW="4xl" mx="auto" px={6}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </SimpleGrid>
      </Box>
    </FadeInObserve>
  );
};

export default TestimonialsSection;
