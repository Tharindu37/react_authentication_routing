import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { auth } from './../../firebase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updatePassword, User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';


const AuthContext=React.createContext(undefined);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }:{children:ReactNode}) {
    const [currentUser, setCurrentUser]=useState<User | null | undefined>()
    const [loading, setLoading]=useState(true)

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

    function emailUpdate(email:string){
        return updateEmail(auth.currentUser!,email)
    }

    function passwordUpdate(password:string){
        return updatePassword(auth.currentUser!,password);
    }

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user:User | null)=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])


    const value={
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        emailUpdate,
        passwordUpdate
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}