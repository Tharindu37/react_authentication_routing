import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { auth } from './../../firebase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth';


const AuthContext=React.createContext(undefined);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }:{children:ReactNode}) {
    const [currentUser, setCurrentUser]=useState<User | null | undefined>()
    const [loading, setLoading]=useState(false)

    function signup(email:string, password:string){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email:string, password:string){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        auth.signOut();
    }

    function resetPassword(email:string){
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user:User | null)=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    })


    const value={
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}