import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const toast = useToast();
    const token = sessionStorage.getItem("token");
    const location = useLocation();
    // console.log(location.pathname);

    useEffect(() => {
        const fetchUsers = async () => {
            if (location.pathname.includes("admin")) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`${import.meta.env.VITE_API_KEY}/admin/users}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    const result = await response.json();
                    setUsers(result.users);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error.message);
                    setIsLoading(false);
                }
            }
            else {
                setIsLoading(false);
                return setUsers([]);
            }
        };
        fetchUsers();
    }, [token]);

    const deleteUser = async (id, token) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const result = await response.json();
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            }),
            console.log(error.message);
        }
    }
    const createProduct = async (product, token) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/create-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const result = await response.json();
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            }),
            console.log(error.message);
        }
    }

    const updateProduct = async (id, updatedProduct, token) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/admin/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,

                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const result = await response.json();
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id, token) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/admin/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const result = await response.json();
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }        
    };



    return <AdminContext.Provider value={{ isLoading, updateProduct, deleteProduct, createProduct, users, deleteUser }}>
        {children}
    </AdminContext.Provider>;

}


