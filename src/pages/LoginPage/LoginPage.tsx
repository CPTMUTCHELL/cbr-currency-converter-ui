import React, {useContext, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {IToken, IUser} from "@/Interfaces";
import {useNavigate} from 'react-router-dom';
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/Contexts";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "src/functions/Tokens";

import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";


export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>(Object);
    const {setUserToken} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: event.target.value})

    }
    const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value})
    }
    const keyPressHandler =  (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            callBackend()
        }
    }

    function acceptResponse(res: IToken) {
        setUserToken(getUser(res.accessToken))
        singletonTokenInstance.setToken({
            "access": res.accessToken,
            "refresh": res.refreshToken
        })
        navigate("/convert");
    }
     const callBackend = () => {
         responseHandlerFunc( async ()=> {
             const res = await Service.signIn(user);
             acceptResponse(res.data)
         },{customErrorMsg:"Invalid username or password"})
    }


    const clickHandler =  () => {
        if ((user.username != null && user.password != null)) {
            callBackend()
        }
    }

    return (
        <>
            <div className="login-wrapper">
                <h1 className="alg">Please Log In</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input type="text" onKeyPress={keyPressHandler} onChange={usernameHandler}
                               value={user.username}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input onKeyPress={keyPressHandler} type="password" onChange={passHandler}
                               value={user.password}/>
                    </label>


                </form>
                {loading ? <CircularProgress/> : <button type="button" onClick={clickHandler}>Submit</button>}
            </div>

        </>

    )
}
