import { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const toast = useToast();


  const addToCart = async (pid, token) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/cartlist/add-cart/${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setCartList((prev) => [...prev, result]);
      toast({
        title: "Success",
        description: "Added to cart",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/cartlist", {
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
        setCartList(result.cartProduct);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const removeFromList = async (pid, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cartlist/product/${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setCartList((prev) => prev.filter((item) => item._id !== result._id));
      toast({
        title: "Success",
        description: "Removed from cart",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        isLoading,
        setIsLoading,
        addToCart,
        removeFromList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
