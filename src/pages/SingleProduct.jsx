import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import RecommendedProducts from "../components/RecommendedProducts";
import { CartContext } from "../context/CartContext";

function SingleProduct() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const { addToCart } = useContext(CartContext);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/products/${id}`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const result = await response.json();
        setSingleProduct(result.product);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:gap-4 md:gap-1 mt-7 mx-2 mb-5">
        <div className="w-full">
          <img
            src={singleProduct.images[selectedImage]}
            alt={singleProduct.title}
            className="max-sm:hidden w-full h-96 object-contain "
          />
          <div className="flex justify-center items-center mt-3">
            {singleProduct &&
              singleProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`${
                    selectedImage === index ? "border-2 border-black" : ""
                  } rounded-md `}
                >
                  <img
                    src={image}
                    alt={singleProduct.title}
                    className="max-sm:hidden w-fit mx-2 h-24 object-contain "
                  />
                </button>
              ))}
          </div>
        </div>

        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            src={singleProduct.images[selectedImage]}
            alt={singleProduct.title}
            objectFit={"contain"}
            maxW={{ base: "100%", sm: "200px" }}
            className="hidden max-sm:block"
          />
          <div className="flex justify-center items-center mt-3">
            {singleProduct &&
              singleProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`${
                    selectedImage === index ? "border-2 border-black" : ""
                  } rounded-md`}
                >
                  <img
                    src={image}
                    alt={singleProduct.title}
                    className={`w-fit mx-2 h-24 object-contain hidden max-sm:block `}
                  />
                </button>
              ))}
          </div>
          <Stack mx="2" flex={"1"}>
            <CardBody>
              <Heading size="lg">{singleProduct.title}</Heading>
              <VStack align={"start"} mt={{ base: "10", sm: "1" }}>
                <Heading fontSize={"1rem"}>${singleProduct.price}</Heading>
                <Text fontSize={"1rem"}>Category: {singleProduct.category}</Text>
                <Text fontSize={"1rem"}>Type: {singleProduct.type}</Text>
              </VStack>
              <div className="flex justify-start items-center gap-3 my-2">
                Size:
                {singleProduct &&
                  singleProduct.sizes.map((size, index) => (
                    <div key={index}>
                      <Button
                        onClick={() => setSelectedSize(index)}
                        className={`hover:scale-y-[1.1] transition-all ${
                          selectedSize === index ? "border-2 border-black" : ""
                        }`}
                      >
                        {size}
                      </Button>
                    </div>
                  ))}
              </div>
              <div className="flex justify-start items-center gap-3 my-2">
                Colors:
                {singleProduct &&
                  singleProduct.colors.map((color, index) => (
                    <div key={index}>
                      <Button
                        onClick={() => setSelectedColor(index)}
                        className={`hover:scale-y-[1.1] transition-all ${
                          selectedColor === index ? "border-2 border-red-950" : ""
                        }`}
                      >
                        {color}
                      </Button>
                    </div>
                  ))}
              </div>
              <Divider />
              <Text className="capitalize py-5 " py={"5"}>
                {singleProduct.description}
              </Text>
              <HStack justifyContent={"space-between"} gap={"10px"} mt={"10"}>
                <Button
                  w={"100%"}
                  variant={"outline"}
                  className="hover:scale-y-[1.1] transition-all"
                  onClick={() => addToCart(singleProduct._id, token)}
                >
                  Add Cart🛒{" "}
                </Button>
                <Button
                  w={"100%"}
                  variant={"ghost"}
                  colorScheme="blue.500"
                  className="uppercase hover:scale-y-[1.1] transition-all"
                  bg={"purple.500"}
                  textColor={"white"}
                >
                  Buy Now
                </Button>
              </HStack>
            </CardBody>
          </Stack>
        </Card>

      </div>
      <RecommendedProducts singleProduct={singleProduct} />
    </div>
  );
}

export default SingleProduct;
