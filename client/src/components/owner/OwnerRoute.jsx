import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const OwnerRoute = () => {
    const { user, isOwner, loading } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (!isOwner) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default OwnerRoute;