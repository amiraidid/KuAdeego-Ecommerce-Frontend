import { useContext, useState } from "react";
import { Loader } from "../components";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Divider,
  Grid,
  Image,
  Select,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Carts() {
  const { cartList, isLoading, removeFromList } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});
  

  const totalAmount = cartList.reduce((acc, item) => {
    const itemQuantity = quantity[item._id] || 1;
    return acc + item.price * itemQuantity;
  }, 0);

  const handleCheckout = async () => {
    const orderData = {
      items: cartList.map((item) => ({
        productId: item.productId,
        size: selectedSize[item._id] || item.sizes[0],
        color: selectedColor[item._id] || item.colors[0],
        qty: quantity[item._id] || 1,
        image: item.images[0],
        status: "pending",
      })),
    };

    const hasIncompleteFields = orderData.items.some((item) => {
      return !item.qty || !item.size || !item.color;
    });

    if (hasIncompleteFields) {
      alert("Please select quantity, size, and color for all items.");
      return;
    }
    createOrder(orderData, token);
    navigate("/checkouts")
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 1),
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "2fr 1fr" }}
      gap={6}
      p={6}
      mb="6px"
    >
      <Box>
        {cartList && cartList.length > 0 ? (
          cartList.map((item) => (
            <Box key={item._id} mb={4}>
              <Flex justify="space-between" align="center" mb={4}>
                <Box boxSize="60px" flexShrink={0}>
                  <Image
                    src={(item.images && item.images[0]) || ""}
                    alt={item.title}
                    objectFit="cover"
                    height={"fit-content"}
                  />
                </Box>
                <Box flex="1" fontSize="xs" ml={4}>
                  <Heading size="sm" noOfLines={1}>
                    {item.title}
                  </Heading>
                  <Text color="gray.600">${item.price}</Text>
                  <Flex mt={2} gap={2}>
                    <Select
                      placeholder="Size"
                      size={"sm"}
                      w={"100px"}
                      onChange={(e) =>
                        setSelectedSize({
                          ...selectedSize,
                          [item._id]: e.target.value,
                        })
                      }
                    >
                      {item.sizes &&
                        item.sizes.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                    </Select>

                    <Select
                      placeholder="Color"
                      size={"sm"}
                      w={"100px"}
                      onChange={(e) =>
                        setSelectedColor({
                          ...selectedColor,
                          [item._id]: e.target.value,
                        })
                      }
                    >
                      {item.colors &&
                        item.colors.map((color, index) => (
                          <option key={index} value={color}>
                            {color}
                          </option>
                        ))}
                    </Select>
                  </Flex>

                  <HStack spacing={1} mt={2} alignItems="center">
                    <IconButton
                      icon={<MinusIcon />}
                      size="xs"
                      aria-label="Decrease quantity"
                      onClick={() => handleDecreaseQuantity(item._id)}
                    />
                    <Text>{quantity[item._id] || 1}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      size="xs"
                      aria-label="Increase quantity"
                      onClick={() => handleIncreaseQuantity(item._id)}
                    />
                  </HStack>
                </Box>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => removeFromList(item._id, token)}
                >
                  Remove
                </Button>
              </Flex>
              <Divider />
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={10} px={6}>
            <Heading size="lg" color="gray.600">
              No items in your cart
            </Heading>
            <Text mt={2} color="gray.500">
              Add items to your cart to see them here.
            </Text>
          </Box>
        )}
      </Box>

      {/* Checkout Column */}
      <Box
        p={5}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="md"
        bg="white"
      >
        <Heading size="md" mb={4} color="gray.800">
          Checkout Summary
        </Heading>
        <Divider mb={4} />
        {cartList.map((item) => (
          <Box
            key={item._id}
            mb={4}
            p={3}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              {item.title}
            </Text>
            <Flex justify="space-between">
              <Text fontSize="sm" color="gray.600">
                Quantity: {quantity[item._id] || 1}
              </Text>
              <Text fontSize="sm" color="gray.800" fontWeight="bold">
                ${item.price * (quantity[item._id] || 1)}
              </Text>
            </Flex>
          </Box>
        ))}
        <Divider mb={4} />
        <Flex justify="space-between" mb={2}>
          <Text fontSize="lg" color="gray.600">
            Total Items:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {cartList.length}
          </Text>
        </Flex>
        <Flex justify="space-between" mb={4}>
          <Text fontSize="lg" color="gray.600">
            Total Amount:
          </Text>
          <Text fontSize="lg" color="gray.800">
            ${totalAmount.toFixed(2)}
          </Text>
        </Flex>
        <Button
          onClick={handleCheckout}
          colorScheme="teal"
          width="full"
          mt={4}
          disabled={!cartList.length}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Grid>
  );
}

export default Carts;
