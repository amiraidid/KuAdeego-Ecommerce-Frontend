import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Flex, Grid, Heading, Image, Spacer, Stack, Text, VStack, } from '@chakra-ui/react'
import { CartContext } from '../context/CartContext'
import Loader from './Loader'

function ProductComp({ products=[], isLoading }) {
    const { addToCart } = useContext(CartContext)
    const token = sessionStorage.getItem('token') || '';
    
    
    if (isLoading) {
        return <Loader />
      }

    return (
        <div className='mt-20 max-sm:mx-6 max-sm:mt-2'>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)'}} gap={6}>
                {
                    products && products.length > 0 ? products.map((product) => (
                        <Card key={product._id}>
                            <CardBody>
                                <Link to={`/products/product/${product._id}`}><Image src={product.images[0]} alt={product.title} borderRadius='lg' w={'72'}/></Link>
                                <Stack>
                                    <Heading size={'md'} noOfLines={1}>{product.title}</Heading>
                                    <Flex align={'center'}>
                                        <VStack align={'start'}>
                                            <Text fontSize={'1rem'}>${product.price}</Text>
                                            <Text color={'blue.400'} fontSize={'0.7rem'}>{product.inStock ? "available now" : "out of stock"}</Text>
                                        </VStack>
                                        <Spacer />
                                        <Button w={'20'} onClick={() => addToCart(product._id, token)} variant={'outline'}>AddCart</Button>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    )) : <div className='text-center text-2xl font-bold'>No Products Found</div>
                }
            </Grid>

        </div>
    )
}

export default ProductComp