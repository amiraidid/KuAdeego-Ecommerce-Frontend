import { createContext, useEffect, useState } from "react";


export const ProductsContext = createContext();


export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                setIsLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_KEY}/products?category=${value}&type=`)
                if (!response.ok) {
                  throw new Error(response.status)
                }
                const result = await response.json()
                setProducts(result.products)
                setIsLoading(false)
              } catch (error) {
                console.log(error.message)
                setIsLoading(false)
              }
        }
        fetchProducts()
    }, [value])

    return (
        <ProductsContext.Provider value={{ products, setProducts, isLoading, setIsLoading, value, setValue }}>
            {children}
        </ProductsContext.Provider>
    )
}