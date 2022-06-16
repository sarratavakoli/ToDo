import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

//redirects unauth user to login screen. pass in children via params as a prop which refers to any component that is nested inside protectedroute tags
export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />
}
