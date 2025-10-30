import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Carts, Checkout, Failed, Kids, Login, Men, NotFoundPage, Product, Signup, SingleProduct, Success, UserDashboard, Women } from '../pages'
import Home from '../pages/Home'
import Admin from '../pages/admin'
import ProtectedRoutes from './ProtectedRoutes'

function AllRoutes() {
  return (
    <main>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/success' element={<Success />}/>
            <Route path='/failed' element={<Failed />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/products' element={<Product />}/>
            <Route path='/products/product/:id' element={<SingleProduct />}/>
            <Route path='/men-section' element={<Men />}/>
            <Route path='/women-section' element={<Women />}/>
            <Route path='/kids-section' element={<Kids />}/>
            <Route path='/carts' element={<ProtectedRoutes><Carts /></ProtectedRoutes>}/>
            <Route path='/checkouts' element={<ProtectedRoutes><Checkout /></ProtectedRoutes>}/>
            <Route path='/dashboard' element={<ProtectedRoutes><UserDashboard /></ProtectedRoutes>}/>
            <Route path='*' element={<NotFoundPage />}/>
        </Routes>
    </main>      
  )
  
}

export default AllRoutes