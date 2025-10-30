import React from 'react'
import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Dropdown } from "flowbite-react";

function SideFilter({value, setValue}) {
    

    return (
        <div className='lg:mx-6 md:mx-2'>
            <Heading>Filter Products</Heading>
            <div className='max-sm:hidden'>
                <Box bg={'ButtonShadow'} rounded={'lg'} p={'4'} w={'200px'} h={'fit'} mt={'10'}>
                    <h1 className='text-center my-4 font-medium'>Filter By Choosing</h1>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack>
                            <Radio value=''>All</Radio>
                            <Radio value='Men'>Men</Radio>
                            <Radio value='Women'>Women</Radio>
                            <Radio value='kids'>Kids</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </div>
            {/* mobile filter */}
            <div className='hidden max-sm:block mt-5 mb-3 w-52 h-fit'>
                <Dropdown label="Filter By Choosing" inline >
                    <RadioGroup onChange={setValue} value={value}>
                    <Stack>
                            <Radio value=''>All</Radio>
                            <Radio value='Men'>Men</Radio>
                            <Radio value='Women'>Women</Radio>
                            <Radio value='kids'>Kids</Radio>
                        </Stack>
                    </RadioGroup>
                </Dropdown>
            </div>
        </div>
    )
}

export default SideFilter