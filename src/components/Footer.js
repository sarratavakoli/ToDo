import React from 'react'
import Logout from './Auth/Logout'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { currentUser } = useAuth();
  return (
    <div className="footer">
      {currentUser && <>
        <Link to="/categories" className="text-lowercase m-0 p-0"><h6>view categories</h6></Link>
      </>}
      <footer className="text-center text-white bg-info p-4">
        <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
      </footer>
    </div>
  )
}
