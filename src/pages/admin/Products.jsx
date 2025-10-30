import React, { useContext } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Heading,
} from "@chakra-ui/react";
import { ProductsContext } from "../../context/ProductsContext";
import Loader from "../../components/Loader";
import ProductModal from "../../components/ProductModal";
import { AdminContext } from "../../context/AdminContext";
import AddModel from "../../components/AddModel";

function Products() {
  const { products, isLoading } = useContext(ProductsContext);
  const { deleteProduct } = useContext(AdminContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading>Manage Products</Heading>
        <AddModel />
      </div>
      <div>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Type</Th>
                <Th>InStock</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products && products.length > 0
                ? products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.title}</Td>
                      <Td>${product.price}</Td>
                      <Td>{product.category}</Td>
                      <Td>{product.type}</Td>
                      <Td>{product.inStock ? 'available' : 'unavailable'}</Td>
                      <Td>
                        <ProductModal product={product} />
                      </Td>
                      <Td>
                        <Button
                          onClick={() => deleteProduct(product._id)}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Products;
