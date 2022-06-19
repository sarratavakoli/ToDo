import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext' 
import '../App.css'
import Logout from './Auth/Logout'
import Login from './Auth/Login'
import TodaysDate from '../utilities/todaysDate'

export default function Navigation() {
    const { currentUser } = useAuth();
    
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="p-3" sticky="top">
      <Navbar.Brand href="/"> 

        {currentUser && 
        <> 
          {currentUser.displayName.split(' ')[0]}'s Tasks 
          <Logout />
        </>}

        {!currentUser && 
        <>
          ToDo List
          <div className="bg-dark text-white">
            <div className="loginLink">
              <Link to="/login" className="loginLink">Login</Link>
            </div>
          </div>
        </>}
        
      </Navbar.Brand>
      {/* <Navbar.Toggle /> */}
          <div className="text-white text-center w-100 titleFont">
          todo
        </div>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {/* {currentUser &&
            <>
              <Link to="/resources" className="nav-link">Resources</Link>
              <Link to="/categories" className="nav-link">Categories</Link>
            </>
          } */}
          
          <div className="text-white text-right navbar-brand">
            {/* {new Date().getFullYear()} */}
            <TodaysDate />
          </div>
          {/* {!currentUser && <Link to="/login" className="nav-link">Login</Link>} */}
          {/* <Link to="/todos" className="nav-link">ToDos</Link> */}
          
          {/* {!currentUser && 
            <Link to="/login" className="nav-link">Login</Link>
          } */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
