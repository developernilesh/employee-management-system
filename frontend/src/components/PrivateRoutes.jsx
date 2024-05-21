import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const PrivateRoutes = () => {
    const {isLoggedIn} = useAuth();

    return (isLoggedIn === undefined ? 
        (
            <p>Loading...</p>
        ) : 
        (
            isLoggedIn === true ? 
            (
                <Outlet/>
            ) : 
            (
                <Navigate to='/login'/>
            )
        )
    )
};

export default PrivateRoutes;
