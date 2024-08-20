import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const userRole = localStorage.getItem("userRole"); // Assuming the token is stored in localStorage
    let isAdmin = false;
    if (userRole === "ROLE_ADMIN") {
        isAdmin = true;
    }

    return isAdmin ? <Component {...rest} /> : <Navigate to="/" />; // Redirect if not admin
};

export default ProtectedRoute;
