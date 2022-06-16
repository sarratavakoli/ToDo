import React from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import './Auth.css'
// import Profile from './Profile';

export default function Logout() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    function handleAuth(){
        logout();
        navigate("/");
    }

    return (
        <div className="logout text-center bg-dark text-white">
            {/* <Profile /> */}
            <div onClick={() => handleAuth()} className=''>
                Logout
            </div>
        </div>
    
  )
}
