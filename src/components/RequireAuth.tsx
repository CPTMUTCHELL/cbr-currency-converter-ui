import React, {useContext, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {UserContext} from "../functions/Contexts";
import {getUser} from "../functions/JwtToken";
import {singletonTokenInstance} from "../functions/Tokens";
import {NotAuthorizedPage} from "../pages/SupportPages/NotAuthorizedPage";

export const RequireAuth:React.FC<{allowedRoles:string[]}> = ({allowedRoles}) => {
    const {userToken,setUserToken}  = useContext(UserContext);
    const token = singletonTokenInstance.getToken().access
    const navigate = useNavigate();
    useEffect(()=>{

        if (token!==null) {
            setUserToken(getUser(singletonTokenInstance.getToken().access))
        }
    },[])

    if (userToken.roles) {
        const hasPermission: boolean = allowedRoles.some(role => JSON.stringify(userToken.roles).includes(role))
        if (hasPermission !== undefined && hasPermission)
            return <Outlet/>

    }
    if (!token) navigate("/login")
    return <NotAuthorizedPage/>


}
