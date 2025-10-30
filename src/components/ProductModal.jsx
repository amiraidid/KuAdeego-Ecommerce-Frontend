import React, { useRef, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import { AdminContext } from "../context/AdminContext";


function ProductModal({ product }) {

  const { updateProduct } = useContext(AdminContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  return (
    <>
      <Button onClick={onOpen} variant={'outline'}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} size={"3xl"} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ProductForm
              product={product}
              updateProduct={updateProduct}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductModal;
