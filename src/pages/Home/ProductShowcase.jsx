import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { ProductsContext } from '../../context/ProductsContext';
import Loader from '../../components/Loader';
import FadeInObserve from '../../components/FadeInObserve';

const ProductCard = ({ images, title, price, _id }) => (
  <Box className="p-4 bg-white rounded-lg shadow-lg">
    <Link to={`products/product/${_id}`}><Image src={images[0]} alt={title} className="rounded-t-lg object-cover" /></Link>
    <Text fontSize="lg" fontWeight="bold" mt={2} noOfLines={1}>{title}</Text>
    <Text fontSize="md" color="gray.500">${price}</Text>
    <Button colorScheme="blue" size="sm" mt={3}><Link to={`products/product/${_id}`}>View Details</Link></Button>
  </Box>
);

const ProductShowcase = () => {
  const { products, isLoading } = useContext(ProductsContext);
  const shuffled = products.sort(() => Math.random() - 0.5);
  const productsToShow = shuffled.slice(0, 4);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FadeInObserve>
      <Box className="py-12">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8}>Featured Products</Text>
        <SimpleGrid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} spacing={8} maxW="6xl" mx="auto" px={6}>
          {productsToShow.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </SimpleGrid>
      </Box>
    </FadeInObserve>
  );
};

export default ProductShowcase;
