import React from "react";
import {useToLogin} from "../hooks/useToLogin";

export const Logout: React.FC<{logoutBtn:string, setOpenResponsiveBtn: (openResponsiveBtn: boolean) => void }> = ({ logoutBtn,setOpenResponsiveBtn}) => {
    const {performLogout} = useToLogin();

    function handleLogOut (){
        performLogout("You've logged out")
    }

    return (

        <button className={logoutBtn} type="button" onClick={()=>{
            handleLogOut()
            setOpenResponsiveBtn(false)
        }}>
            Logout
        </button>

    );

}
