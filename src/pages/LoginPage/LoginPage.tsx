import React, {useState, useContext, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {IUser, IToken} from "@/Interfaces";
import {useNavigate, useLocation} from 'react-router-dom';
import {getUser} from "src/functions/JwtToken";
import {UserContext} from "src/functions/UserContext";
import './scss/LoginPage.scss';
import {singletonTokenInstance} from "src/functions/Tokens";
import {useAxiosFunction} from "src/hooks/useAxiosFunction";

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

    const [loginLoading, login] = useAxiosFunction<IUser,IToken>({
        method: "POST",
        url: "backend/auth/login"
    })
    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: event.target.value})

    }
    const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value})
    }
    const keyPressHandler = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            const res = await login(user)
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
            const res = await login(user)
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
                    {loginLoading ? <CircularProgress/> : <button type="button" onClick={clickHandler}>Submit</button>}
                </div>

        </>

    )
}
