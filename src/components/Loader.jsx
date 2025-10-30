import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <div>
        <Center>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
          <div className='flex justify-center items-center h-screen px-4'>
            <h1 className='text-2xl font-bold text-blue-900 italic K'>Ku</h1>
            <h1 className='text-2xl font-bold text-red-600 italic '>ADE</h1>
            <h1 className='text-2xl font-bold text-emerald-500 italic E'>EGO</h1>
          </div>
        </Center>
    </div>
  )
}

export default Loader