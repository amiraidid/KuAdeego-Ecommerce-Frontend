import React from 'react'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Header from './Header'
import Products from './Products'
import Users from './Users'
import Orders from './Orders'

function Admin() {
  return (
    <div className='max-sm:mx-7 mx-5'>
      <Header />
      <Tabs>
        <TabList>
          <Tab><h1 className='text-2xl font-bold text-blue-900 italic'>Products</h1></Tab>
          <Tab><h1 className='text-2xl font-bold text-blue-900 italic'>Users</h1></Tab>
          <Tab><h1 className='text-2xl font-bold text-blue-900 italic'>Orders</h1></Tab>
        </TabList>

        <TabPanels>
          <TabPanel><Products /></TabPanel>
          <TabPanel><Users /></TabPanel>
          <TabPanel><Orders /></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Admin