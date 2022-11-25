import React, {useContext, useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {IUser} from "@/Interfaces";
import {useLocation, useNavigate} from 'react-router-dom';
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/UserContext";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "src/functions/Tokens";

import {Service} from "src/functions/Service";

interface IFrom {
    msg: string
}


export const LoginPage: React.FC = () => {
    const from = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>("");
    const [redirectMsg] = useState(from.state as IFrom);
    //to remove logout msg after page refresh
    useEffect(() => {
        navigate(from.pathname, {replace: true});
    }, [])
    const [user, setUser] = useState<IUser>(Object);
    const {setUserToken} = useContext(UserContext);
    const [loading,setLoading]=useState(false);
    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: event.target.value})

    }
    const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value})
    }
    const keyPressHandler = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            setLoading(true)
            const res = await Service.signIn(user)
            setLoading(false)
            acceptResponse(res)
        }
    }
    function acceptResponse(loginResponse:any){
        const {response ,error} = loginResponse
        if (response) {
            setUserToken(getUser(response.data.accessToken))
            singletonTokenInstance.setToken({
                "access": response.data.accessToken,
                "refresh": response.data.refreshToken
            })
            navigate("/convert");
        }
        if (error) {
            setError("Invalid login or pass")
        }
    }

    const clickHandler = async () => {
        if ((user.username != null && user.password != null)) {
            setLoading(true)
            const res = await Service.signIn(user)
            setLoading(false)
            acceptResponse(res)

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
                    {error && <p className="error">{error}</p>}
                    {loading ? <CircularProgress/> : <button type="button" onClick={clickHandler}>Submit</button>}
                </div>

        </>

    )
}
