import React, { useContext } from "react";
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Button,
  Th,
} from "@chakra-ui/react";
import { AdminContext } from "../../context/AdminContext";
import Loader from "../../components/Loader";

function Users() {
  const { users, isLoading, deleteUser } = useContext(AdminContext);
  const token = sessionStorage.getItem("token");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>lastName</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => deleteUser(user._id, token)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
