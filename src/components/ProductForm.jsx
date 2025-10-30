import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";

const ProductForm = ({ product, updateProduct, onClose }) => {
  const token = sessionStorage.getItem("token");

  const [productData, setProductData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    images: product?.images || [],
    category: product?.category || "",
    type: product?.type || "",
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    inStock: product?.inStock ?? true,
  });

  const handleUpdatebtn = (event) => {
    event.preventDefault();
    updateProduct(product._id, productData, token);
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleUpdatebtn}>
      <SimpleGrid columns={3} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            value={productData.type}
            onChange={(e) =>
              setProductData({ ...productData, type: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Sizes</FormLabel>
          <Input
            type="text"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({ ...productData, sizes: e.target.value.split(", ") })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Colors</FormLabel>
          <Input
            type="text"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({ ...productData, colors: e.target.value.split(", ") })
            }
          />
        </FormControl>

        <FormControl gridColumn={"span 3"}>
          <FormLabel>Images</FormLabel>
          <Textarea
            type="text"
            value={productData.images.join(", ")}
            onChange={(e) =>
              setProductData({ ...productData, images: e.target.value.split(", ") })
            }
          />
        </FormControl>

        <FormControl gridColumn={"span 3"}>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </FormControl>

        <Checkbox
          colorScheme="green"
          isChecked={productData.inStock}
          onChange={(e) =>
            setProductData({ ...productData, inStock: e.target.checked })
          }
        >
          In Stock
        </Checkbox>
      </SimpleGrid>
      <Button type="submit" mt={6} colorScheme="blue">
        Update Product
      </Button>
    </Box>
  );
};

export default ProductForm;
