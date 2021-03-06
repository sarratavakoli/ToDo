import React from 'react'
import Logout from './Auth/Logout'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { currentUser } = useAuth();
  return (
    <div className="footer">      
      <footer className="text-center text-white p-4">
      {currentUser && <>
        <Link to="/categories" className="text-lowercase text-white"><h6>view categories</h6></Link>
      </>}
        <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
      </footer>
    </div>
  )
}
