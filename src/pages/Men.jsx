import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Heading, Image, Stack, VStack, Text, Button, Spacer, Flex } from '@chakra-ui/react';
import Loader from '../components/Loader';
import { CartContext } from '../context/CartContext';

function Men() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  console.log(products);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/products?category=Men`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const result = await response.json();
        setProducts(result.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const menShoes = products.filter((product) => product.type === 'shoes');
  const menClothing = products.filter((product) => product.type === 'clothing');

  return (
    <div className="my-5 mx-4">
      <Heading>Explore Men Category</Heading>

      <h2 className="text-2xl font-bold my-4">Men Shoes</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 max-sm:grid-cols-2 gap-4 mt-2">
        {menShoes.length > 0 ? (
          menShoes.map((product) => (
            <Card key={product._id}>
              <CardBody>
                <Link to={`/products/product/${product._id}`}>
                  <Image src={product.images[0]} alt={product.title} borderRadius="lg" w={'72'} />
                </Link>
                <Stack>
                  <Heading size="md" noOfLines={1}>{product.title}</Heading>
                  <Flex align="center">
                    <VStack align="start">
                      <Text fontSize="1rem">${product.price}</Text>
                      <Text color="blue.400" fontSize="0.7rem">
                        {product.inStock ? 'Available now' : 'Out of stock'}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Button w="20" onClick={() => addToCart(product._id, token)} variant="outline">
                      Add to Cart
                    </Button>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="text-center text-2xl font-bold">No Products Found</div>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-5">Men Clothing</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 max-sm:grid-cols-2 gap-4 mt-5">
        {menClothing.length > 0 ? (
          menClothing.map((product) => (
            <Card key={product._id}>
              <CardBody>
                <Link to={`/products/product/${product._id}`}>
                  <Image src={product.images[0]} alt={product.title} borderRadius="lg" w={'72'} />
                </Link>
                <Stack>
                  <Heading size="md" noOfLines={1}>{product.title}</Heading>
                  <Flex align="center">
                    <VStack align="start">
                      <Text fontSize="1rem">${product.price}</Text>
                      <Text color="blue.400" fontSize="0.7rem">
                        {product.inStock ? 'Available now' : 'Out of stock'}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Button w="20" onClick={() => addToCart(product._id, token)} variant="outline">
                      Add to Cart
                    </Button>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="text-center text-2xl font-bold">No Products Found</div>
        )}
      </div>
    </div>
  );
}

export default Men;
