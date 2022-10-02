import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {IUser, IToken} from "../../Interfaces";
import {useNavigate, useLocation} from 'react-router-dom';
import {getUser} from "../../functions/JwtToken";
import  {UserContext} from "../../functions/UserContext";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "../../functions/Tokens";

interface IFrom {
    msg: string
}
export const LoginPage: React.FC = () => {
    const API_URL = "backend/auth/login";
    const from = useLocation();
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");

    const [token, setToken] = useState<IToken>(Object);

    const [redirectMsg] = useState(from.state as IFrom);
    //to remove logout msg after page refresh
    useEffect(()=>{
        navigate(from.pathname, { replace: true });

    },[])
    const [user, setUser] = useState<IUser>(Object);
    const {setUserToken}  = useContext(UserContext);

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: event.target.value})


    }

    const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value})

    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            axios
                .post<IToken>(API_URL, user)
                .then((res) => {
                    setToken({...token, refreshToken: res.data.refreshToken, accessToken: res.data.accessToken})
                    setUserToken(getUser(res.data.accessToken))
                    singletonTokenInstance.setToken({"access": res.data.accessToken,"refresh": res.data.refreshToken})

                    navigate("/convert");

                })
                .catch(error => {
                    console.log(!error.response)
                    setError("Wrong login or pass")

                });
        }

    }

    const clickHandler = (e:  React.MouseEvent) => {

        if ((user.username != null && user.password != null)) {
            axios
                .post<IToken>(API_URL, user)
                .then((res) => {
                    setToken({...token, refreshToken: res.data.refreshToken, accessToken: res.data.accessToken})
                    setUserToken(getUser(res.data.accessToken))
                    singletonTokenInstance.setToken({"access": res.data.accessToken,"refresh": res.data.refreshToken})
                    navigate("/convert");

                })
                .catch(error => {

                    setError("Wrong login or pass")

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
                <p className="error">{error}</p>
                <button type="button" onClick={clickHandler}>Submit</button>

            </div>
        </>

    )
}