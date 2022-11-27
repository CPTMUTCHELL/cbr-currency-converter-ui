import React, {useContext, useEffect} from "react";
import "./scss/SupportPageStyles.scss"
import {singletonTokenInstance} from "src/functions/Tokens";
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/Contexts";

export const GreetingsPage:React.FC = () => {
    const {setUserToken}  = useContext(UserContext);
    const token = singletonTokenInstance.getToken().access;
    useEffect(()=>{
        if (token!==null) {
            setUserToken(getUser(singletonTokenInstance.getToken().access))
        }
    },[])
    return <div className="support-page-container">
        <h1>
            Hey, welcome to my project :)
        </h1>
        <h2>You can sign up (look at navbar) or just log in as an admin (same username and password)</h2>
    </div>
}