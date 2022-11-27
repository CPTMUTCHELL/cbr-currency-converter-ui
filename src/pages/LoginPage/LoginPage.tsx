import React, {useContext, useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {IToken, IUser} from "@/Interfaces";
import {useLocation, useNavigate} from 'react-router-dom';
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/UserContext";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "src/functions/Tokens";

import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";

interface IFrom {
    msg: string
}


export const LoginPage: React.FC = () => {
    const from = useLocation();
    const navigate = useNavigate();

    const [redirectMsg] = useState(from.state as IFrom);
    //to remove logout msg after page refresh
    useEffect(() => {
        navigate(from.pathname, {replace: true});
    }, [])
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
         },"Invalid username or password")
    }


    const clickHandler =  () => {
        if ((user.username != null && user.password != null)) {
            callBackend()
        }
    }

    return (
        <>
            <div className="login-wrapper">
                {redirectMsg !== null && <h3>{redirectMsg.msg}</h3>}
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
