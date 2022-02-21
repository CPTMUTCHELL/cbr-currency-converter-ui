import React from "react";

import {useToLogin} from "../hooks/useToLogin";

export const Logout: React.FC = () => {
    const {performLogout} = useToLogin();

    const handleLogOut = (e: any) => {
        performLogout("You've logged out")
    }

    return (
        <button type="button" onClick={handleLogOut}>
            Logout
        </button>
    );

}
