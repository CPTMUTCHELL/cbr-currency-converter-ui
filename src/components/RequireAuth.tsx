import React, {useContext, useEffect, useState} from "react";
import {Navigate, useLocation,Outlet} from "react-router-dom";
import {UserContext} from "../functions/UserContext";
import {getUser} from "../functions/JwtToken";
import {useValidate} from "../hooks/useValidate";
import { singletonTokenInstance} from "../functions/Tokens";
import { ClipLoader } from "react-spinners";

export const RequireAuth = () => {
    let {userToken,setUserToken}  = useContext(UserContext);
    let location = useLocation();
    const {performValidation} = useValidate();
    const token = singletonTokenInstance.getToken().access
    const [useEffectCompleted,setUseEffectCompleted] =useState(false);

    useEffect(()=>{

        if (token!==null) {
            performValidation(token)
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


    return userToken.username!==undefined ?  <Outlet/>:<Navigate to="/login" state={{ from:location }} replace/>;

}
