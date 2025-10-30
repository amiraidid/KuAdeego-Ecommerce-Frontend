import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <ProductsProvider>
          <CartProvider>
            <OrderProvider>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </OrderProvider>
          </CartProvider>
        </ProductsProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);
