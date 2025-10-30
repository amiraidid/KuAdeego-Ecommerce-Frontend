import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    Text,
    Flex,
    Spacer,
    Button,
    VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";

function RecommendedProducts({ singleProduct }) {
  const { addToCart, isLoading, products } = useContext(ProductsContext);
  const token = sessionStorage.getItem("token");

  const recommendedProducts = products.filter((product) => {
    return (
      product._id !== singleProduct._id &&
      product.category === singleProduct.category &&
      product.type === singleProduct.type
    )
  }).slice(0, 4);
  

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-5 mx-4">
      <Heading size="lg" my={'5'}>{recommendedProducts.length > 0 ? "Recommended Products" : null}</Heading>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <Card key={product._id} maxW="sm" h={'fit-content'} w={'fit-content'}>
              <CardBody>
                <Link to={`/products/product/${product._id}`}>
                  <Image src={product.images[0]} alt={product.title} borderRadius="lg" w={'full'} h={'40'} objectFit={'cover'}/>
                </Link>
                <Stack>
                  <Heading size="md">{product.title}</Heading>
                  <Flex align="center">
                    <VStack align="start">
                      <Text fontSize="1rem">${product.price}</Text>
                      <Text color="blue.400" fontSize="0.7rem">
                        {product.inStock ? "Available now" : "Out of stock"}
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
        ) : null}
      </div>
    </div>
  );
}

export default RecommendedProducts;
