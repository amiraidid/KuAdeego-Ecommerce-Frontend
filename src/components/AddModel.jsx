import React, { useRef, useState, useContext } from "react";
import {
  useDisclosure,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AdminContext } from "../context/AdminContext";

function AddModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    type: "",
    sizes: [],
    colors: [],
    images: [],
    description: "",
    inStock: false,
  });
  const { createProduct } = useContext(AdminContext);
  const token = sessionStorage.getItem("token");

  const handleCreateProduct = async () => {
    try {
      await createProduct(productData, token);
      onClose();
      setProductData({
        title: "",
        price: "",
        category: "",
        type: "",
        sizes: [],
        colors: [],
        images: [],
        description: "",
        inStock: false,
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div>
      <Button onClick={onOpen} variant={"outline"}>
        Add Product
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        size={"3xl"}       
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Input
                  type="text"
                  value={productData.type}
                  onChange={(e) =>
                    setProductData({ ...productData, type: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Sizes</FormLabel>
                <Input
                  type="text"
                  value={productData.sizes.join(", ")}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      sizes: e.target.value.split(", "),
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Colors</FormLabel>
                <Input
                  type="text"
                  value={productData.colors.join(", ")}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      colors: e.target.value.split(", "),
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired gridColumn={"span 3"}>
                <FormLabel>Images</FormLabel>
                <Textarea
                  type="text"
                  value={productData.images.join(", ")}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      images: e.target.value.split(", "),
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired gridColumn={"span 3"}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
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
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateProduct} ml={4}>
              Create Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddModel;
