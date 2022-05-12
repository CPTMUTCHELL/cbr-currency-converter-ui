import React, {useContext, useEffect, useState} from "react";
import { useLocation,Outlet} from "react-router-dom";
import {UserContext} from "../functions/UserContext";
import {getUser} from "../functions/JwtToken";
import { singletonTokenInstance} from "../functions/Tokens";
import { ClipLoader } from "react-spinners";
import {NotAuthorizedPage} from "../pages/NotAuthorizedPage";

export const RequireAuth:React.FC<{allowedRoles:string[]}> = ({allowedRoles}) => {
    const {userToken,setUserToken}  = useContext(UserContext);
    const token = singletonTokenInstance.getToken().access
    const [useEffectCompleted,setUseEffectCompleted] =useState(false);
    useEffect(()=>{

        if (token!==null) {
            setUserToken(getUser(singletonTokenInstance.getToken().access))
        }
        setUseEffectCompleted(true)
    },[])
    if (!useEffectCompleted) {
        const style = {textAlign: 'center' as const};

        return (  <div style={style}>
            <ClipLoader color={"#123abc"} loading={!useEffectCompleted} />
        </div> )
    }
    return allowedRoles.some(role=>JSON.stringify(userToken.roles).includes(role)) ?  <Outlet/>: <NotAuthorizedPage/>;

}
