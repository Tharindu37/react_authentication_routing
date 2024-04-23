import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// function PrivateRoute({component: Component, ...rest}) {
function PrivateRoute() {
    const { currentUser } = useAuth();
    console.log(currentUser)
  return (
    // <Route
    //     {...rest}
    //     render={(props)=>{
    //         return currentUser ? <Component {...props}/> : <Navigate to='/login'/>
    //     }}
    //     ></Route>

    // <Route
    //   {...rest}
    //   element={currentUser ? <Component /> : <Navigate to="/login" />}
    // />

    // <Route
    //   {...rest}
    //   element={currentUser ? <Component /> : <Navigate to="/login" />}
    // />

    currentUser ? <Outlet/> : <Navigate to="/login" />
      
  )
}

export default PrivateRoute