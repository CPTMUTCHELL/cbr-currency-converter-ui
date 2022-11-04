import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {IUser, IToken} from "../../Interfaces";
import {useNavigate, useLocation} from 'react-router-dom';
import {getUser} from "../../functions/JwtToken";
import {UserContext} from "../../functions/UserContext";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "../../functions/Tokens";
import {useAxios} from "../../hooks/useAxios";
import {useAxiosFunction} from "../../hooks/useAxiosFunction";

interface IFrom {
    msg: string
}

export const LoginPage: React.FC = () => {
    const API_URL = "backend/auth/login";
    const from = useLocation();
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");


    const [redirectMsg] = useState(from.state as IFrom);
    //to remove logout msg after page refresh
    useEffect(() => {
        navigate(from.pathname, {replace: true});

    }, [])
    const [user, setUser] = useState<IUser>(Object);
    const {setUserToken} = useContext(UserContext);

    const [loginResp, loginError, loginLoading, login] = useAxiosFunction<IToken, IUser>({
        method: "POST",
        url: "backend/auth/login"
    })


    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: event.target.value})


    }
    const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value})
    }
    const keyPressHandler =  (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            login(user)
        }
    }
    useEffect(() => {
        if (loginResp) {
            setUserToken(getUser(loginResp.accessToken))
            singletonTokenInstance.setToken({"access": loginResp.accessToken, "refresh": loginResp.refreshToken})
            navigate("/convert");
        }
        if (loginError){
            setError("Invalid login or pass")
        }
    }, [loginResp,loginError])


        const clickHandler = (e: React.MouseEvent) => {

            if ((user.username != null && user.password != null)) {
                axios
                    .post<IToken>(API_URL, user)
                    .then((res) => {
                       setUserToken(getUser(res.data.accessToken))
                        singletonTokenInstance.setToken({
                            "access": res.data.accessToken,
                            "refresh": res.data.refreshToken
                        })
                        navigate("/convert");

                    })
                    .catch(error => {
                        setError("Invalid login or pass")
                    });
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
                    <button type="button" onClick={clickHandler}>Submit</button>

                </div>
            </>

        )
    }
