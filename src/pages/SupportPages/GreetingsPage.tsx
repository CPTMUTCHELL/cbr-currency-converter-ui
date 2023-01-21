import React, {useContext, useEffect, useReducer, useState} from "react";
import "./scss/SupportPageStyles.scss"
import {singletonTokenInstance} from "src/functions/Tokens";
import {getUser} from "src/functions/JwtToken";
import {INotificationContext, NotificationContext, UserContext} from "src/functions/Contexts";
import {SignUpForm} from "src/components/SignForms/SignUpForm";
import {SignInForm} from "src/components/SignForms/SignInForm";
import Button from '@mui/material/Button';
import {useSearchParams} from "react-router-dom";
import {Service} from "@/functions/Service";
import {useBackendResponseHandler} from "@/hooks/useBackendResponseHandler";
import CircularProgress from "@mui/material/CircularProgress";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const verificationToken = searchParams.get("token")
    const [loading, setLoading] = useState<boolean>();
    const {setMessage, setShow,setAlertType} = useContext(NotificationContext) as INotificationContext;

    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    useEffect(() => {
        if (verificationToken !== null) {
            responseHandlerFunc(async () => {
                const res = await Service.verifyUser(verificationToken)
                setMessage(res.data)
                setShow(true)
                setAlertType("success")
            })

        }
        searchParams.delete('token');
        setSearchParams(searchParams);
    },[])
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
            {loading ?
                <div>
                    <h1>Verifying your email, please wait</h1>
                    <CircularProgress/>
                    </div>
                    :
                    <div><h1>
                    Hey, welcome to my project :)
                    </h1>
                        <h2>You can sign up or just log in as an admin (same username and password)</h2>
                    </div>
            }

        </div>
    </div>
}