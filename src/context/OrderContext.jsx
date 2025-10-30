import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext()


export const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const toast = useToast()
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                setIsLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_KEY}/order`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    }
                })
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const result = await response.json()
                setOrders(result.orders)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error.message)
            }
        }
        fetchOrders()
    }, [])

    const createOrder = async(order, token) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:5000/order/create-order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(order)
            })
            if (!response.ok) { 
                throw new Error(`Error: ${response.status}`)
            }
            const result = await response.json()
            setOrders([...orders, result.order])
            console.log(result.order)
            setIsLoading(false)
            toast({
                title: 'Order Created',
                description: 'Order has been created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.log("error Message", error.message)
            setIsLoading(false)
            setError(error.message)
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const deleteOrder = async(id, token) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:5000/order/delete-order/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const result = await response.json()
            setOrders(orders.filter(order => order._id !== id))
            setIsLoading(false)
            toast({
                title: 'Order Deleted',
                description: 'Order has been deleted successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const updateOrder = async(id, order, token) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:5000/order/update-order/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    authorization: token
                },
                body: JSON.stringify(order)
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const result = await response.json()
            setOrders(orders.map(order => order._id === id ? result.order : order))
            setIsLoading(false)
            toast({
                title: 'Order Updated',
                description: 'Order has been updated successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }
    
    return (
        <OrderContext.Provider value={{ orders, setOrders, isLoading, setIsLoading, error, setError, createOrder, deleteOrder, updateOrder }}>
            {children}
        </OrderContext.Provider>
    )
}