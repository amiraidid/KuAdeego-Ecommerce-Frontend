import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const token = sessionStorage.getItem('token')

    if (!token) {
        return <Navigate to={'/login'} />
    }

  return children
}

export default ProtectedRoutes