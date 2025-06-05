import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContextAPI'

const ProtectedRoute = ({ children }) => {
  const { isAuthorised } = useContext(tokenAuthContext)

  return isAuthorised ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
