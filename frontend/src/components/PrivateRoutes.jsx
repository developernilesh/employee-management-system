import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const PrivateRoutes = () => {
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn);

    // const location = useLocation();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const verifyAuth = async () => {
    //         setLoading(true);
    //         await verifyUserLogin();
    //         setLoading(false);
    //     };

    //     verifyAuth();
    // }, [location.pathname]);

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    if (isLoggedIn === undefined) {
        return <div>Loading...</div>
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
 
};

export default PrivateRoutes;
