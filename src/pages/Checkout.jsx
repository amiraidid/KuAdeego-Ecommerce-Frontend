import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Input,
  useColorModeValue,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { OrderContext } from "../context/OrderContext";
import {jwtDecode} from "jwt-decode";

function Checkout() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const { orders } = useContext(OrderContext);
  const token = sessionStorage.getItem("token");
  const toast = useToast();

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    toast({
      title: "Authentication Error",
      description: "Please log in again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const totalAmount = orders.reduce((acc, order) => {
    if (order.user === decoded.id) {
      return acc + order.totalPrice;
    }
    return acc;
  }, 0);


  const handlePaymentFunc = async () => {
    const orderId = orders.map((order) => order._id);
    inputs.totalAmount = totalAmount
    console.log({orderId, inputs})
  };

  return (
    <Box
      w="full"
      maxW="6xl"
      bg={useColorModeValue("white", "gray.700")}
      p={8}
      rounded="lg"
      shadow="lg"
      mx="auto"
      mt={10}
    >
      <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.500">
        Checkout
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Product Information Column */}
        <Box>
          <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={4}>
            Cart Items
          </Text>
          <Stack spacing={4} mb={8}>
            {orders &&
              orders.map((order) =>
                order.user === decoded.id &&
                order.status === "pending" &&
                order.orderItems.map((item) => (
                  <Box
                    key={item._id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      {item.title}
                    </Text>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Text fontSize="sm" color="gray.600">
                        Quantity: {item.qty}
                      </Text>
                      <Text fontSize="sm" color="gray.800" fontWeight="bold">
                        ${item.price * item.qty}
                      </Text>
                    </Box>
                  </Box>
                ))
              )}
          </Stack>
          <Text fontSize="lg" fontWeight="bold" color="teal.500" mt={4}>
            Total: ${totalAmount.toFixed(2)}
          </Text>
        </Box>

        {/* Payment and User Information Column */}
        <Box>
          <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={4}>
            User and Payment Information
          </Text>
          <Divider mb={4} />
          <Stack spacing={4}>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </FormControl>
            </HStack>
            <Divider my={4} />
            <FormControl>
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                name="cardNumber"
                value={inputs.cardNumber}
                onChange={(e) => setInputs({ ...inputs, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
            </FormControl>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Expiration Date</FormLabel>
                <Input
                  type="text"
                  name="expirationDate"
                  value={inputs.expirationDate}
                  onChange={(e) => setInputs({ ...inputs, expirationDate: e.target.value })}
                  placeholder="MM/YY"
                />
              </FormControl>
              <FormControl>
                <FormLabel>CVV</FormLabel>
                <Input
                  type="password"
                  name="cvv"
                  value={inputs.cvv}
                  onChange={(e) => setInputs({ ...inputs, cvv: e.target.value })}
                  placeholder="123"
                />
              </FormControl>
            </HStack>
            <Button
              colorScheme="teal"
              size="lg"
              w="full"
              rounded="md"
              _hover={{ bg: "teal.400" }}
              onClick={handlePaymentFunc}
            >
              Pay Now
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Checkout;
