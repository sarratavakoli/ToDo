import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'  

//context object stores auth info
const AuthContext = React.createContext();

//function allows us to use the context in components
export function useAuth(){
    return useContext(AuthContext);
}

//provides AuthContext info to children nexted inside it
export default function AuthProvider({children}) {
    //hooks for currentUser and to determine if context has info to share before rendering child components to screen
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const githubAuthProvider = new GithubAuthProvider();

    async function login(){

        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user);
        }))
    }

    async function logout(){
        signOut(auth).then(setCurrentUser(null));
    }
  
    //object holds params to be used in child components, passed as a prop in the return
    const value = {currentUser, login, logout};
  
    useEffect(() => {
        //uses Firebase functionality to get user info and set currentUser hook, allowing components to load in using the custom loading hook
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange;

    }, []);

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}