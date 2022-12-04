import React, {Component} from 'react'

import { Navigate} from 'react-router-dom'


const PrivateRoute = ({children}) => {
    console.log("private route");
    const user = localStorage.getItem("user");
    return user ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;