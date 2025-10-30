import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Image, Text, Button, SimpleGrid, Center } from "@chakra-ui/react";
import { ProductsContext } from "../../context/ProductsContext";
import Loader from "../../components/Loader";
import FadeInObserve from "../../components/FadeInObserve";


const LatestProducts = () => {
  const { products, isLoading } = useContext(ProductsContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Sort products by `createdAt` in descending order and get the latest 4
    const sortedProducts = [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
    setLatestProducts(sortedProducts);
  }, [products]);



  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className="py-12 bg-gray-50">
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8}>
        Latest Arrivals
      </Text>
      <SimpleGrid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        spacing={8}
        maxW="6xl"
        mx="auto"
        px={6}
      >
        {latestProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </SimpleGrid>
      <Center className="mt-8">
        <Link to={"/products"}>
          <Button
            variant={"outline"}
            colorScheme={"teal"}
            size={"md"}
            className="mt-5 block mx-auto"
          >
            Explore More
          </Button>
        </Link>
      </Center>
    </Box>
  );
};

const ProductCard = ({ images, title, price, _id }) => (
  <FadeInObserve>
    <Box className="p-4 bg-white rounded-lg shadow-lg" id="latest">
      <Link to={`products/product/${_id}`	}><Image src={images[0]} alt={title} className="rounded-t-lg object-cover" /></Link>
      <Text fontSize="lg" fontWeight="bold" mt={2} noOfLines={1}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.500">
        ${price}
      </Text>
      <Button colorScheme="teal" size="sm" mt={3}>
        <Link to={`products/product/${_id}`}>View Details</Link>
      </Button>
    </Box>
  </FadeInObserve>
);

export default LatestProducts;
