import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

function UserDashboard() {
  const { orders, deleteOrder } = useContext(OrderContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);

  return (
    <div className="h-screen">
      <Table>
        <Thead>
          <Tr>
            <Th>Order Title</Th>
            <Th>Order Total Price</Th>
            <Th>Order Status</Th>
            <Th>Delete Order</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => {
              return (
                order.user === decoded.id && (
                  <Tr key={order._id}>
                    <Td>
                      {order.orderItems.map((item) => item.title).join(", ")}
                    </Td>
                    <Td>${order.totalPrice}</Td>
                    <Td>{order.status}</Td>
                    <Td>
                      <Button
                        onClick={() => deleteOrder(order._id, token)}
                        colorScheme="red"
                        size="sm"
                        variant={"outline"}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                )
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default UserDashboard;
