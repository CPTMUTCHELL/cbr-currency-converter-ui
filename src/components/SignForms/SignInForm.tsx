import React, {useContext, useState} from "react";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IToken} from "@/Interfaces";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {getUser} from "src/functions/JwtToken";
import {singletonTokenInstance} from "src/functions/Tokens";
import {Service} from "src/functions/Service";
import {useNavigate} from "react-router-dom";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";
import {UserContext} from "src/functions/Contexts";
import "./scss/SignForm.scss"
import {LoadingButton} from "@mui/lab";
import {SignInUpType} from "@/Types";

export const SignInForm:React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<SignInUpType>(Object);
    const {setUserToken} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    const [showPass, setShowPass] = useState<boolean>(false)

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
        })
    }

    const clickHandler =  () => {
        if ((user.username != null && user.password != null)) {
            callBackend()
        }
    }
    const keyPressHandler =  (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (user.username != null && user.password != null)) {
            callBackend()
        }
    }
    const userHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name==='login') setUser({...user, ["username"]: e.target.value});
        else setUser({...user, ["password"]: e.target.value});
    }

    return (
    <Box className="sign-form">
        <Box className="input-form">

        <FormControl variant="standard">
            <InputLabel>Username/Email</InputLabel>
            <Input  name="login" onChange={userHandler} onKeyDown={keyPressHandler}/>
        </FormControl>

        <FormControl variant="standard">
            <InputLabel>Password</InputLabel>
            <Input
                onKeyDown={keyPressHandler}
                name="password"
                type={showPass ? 'text' : 'password'}
                onChange={userHandler}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPass(!showPass)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {showPass ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
        </Box>
        <LoadingButton loading={loading}  onClick={clickHandler} variant="contained" size="small" endIcon={<AppRegistrationIcon/>}>
            Sign in
        </LoadingButton>
    </Box>
    )
}