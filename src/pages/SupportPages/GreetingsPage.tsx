import React, {useContext, useEffect, useReducer} from "react";
import "./scss/SupportPageStyles.scss"
import {singletonTokenInstance} from "src/functions/Tokens";
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/Contexts";
import {SignUpForm} from "src/components/SignForms/SignUpForm";
import {SignInForm} from "src/components/SignForms/SignInForm";
import Button from '@mui/material/Button';

type signActionTypes = "SIGN_UP" | "SIGN_IN"
interface ISignAction {
    isSignIn:boolean
    isSignUp:boolean
}
const signActionReducer = (state:ISignAction,action:signActionTypes) =>{
    switch (action) {
        case "SIGN_IN":
            return {isSignUp: false,isSignIn:true}
        case "SIGN_UP":
            return {isSignIn: false,isSignUp:true}

    }

}

export const GreetingsPage:React.FC = () => {
    const [signActionState,dispatch] = useReducer(signActionReducer,{isSignIn:true,isSignUp:false})
    const {setUserToken}  = useContext(UserContext);

    const token = singletonTokenInstance.getToken().access;
    useEffect(()=>{
        if (token!==null) {
            setUserToken(getUser(singletonTokenInstance.getToken().access))
        }
    },[])
    return <div className="support-page-container">

        <div className="sign-container">
            <ul>
                <li><Button className={signActionState.isSignIn ? "active" : ""} onClick={()=>dispatch("SIGN_IN")}><span>Sign in</span></Button></li>
                <li><Button className={signActionState.isSignUp ? "active" : ""} onClick={()=>dispatch("SIGN_UP")}><span>Sign up</span></Button></li>
            </ul>
            {signActionState.isSignUp ? <SignUpForm/> : <SignInForm></SignInForm> }
        </div>
        <div className="welcome-text">
        <h1>
            Hey, welcome to my project :)
        </h1>
        <h2>You can sign up (look at navbar) or just log in as an admin (same username and password)</h2>
        </div>
    </div>
}