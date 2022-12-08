import React, {useContext, useState} from "react";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IToken, IUser} from "@/Interfaces";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {getUser} from "src/functions/JwtToken";
import {singletonTokenInstance} from "src/functions/Tokens";
import {Service} from "src/functions/Service";
import {useNavigate} from "react-router-dom";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";
import {UserContext} from "src/functions/Contexts";
import "./scss/SignForm.scss"

export const SignInForm:React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>(Object);
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
        },{customErrorMsg:"Invalid username or password"})
    }


    const clickHandler =  () => {
        if ((user.username != null && user.password != null)) {
            callBackend()
        }
    }
    const userHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name==='login') setUser({...user, ["username"]: e.target.value,["email"]: e.target.value});
        else setUser({...user, ["password"]: e.target.value});
    }

    return (
    <div className="signup">
        <Box className="form">

        <FormControl variant="standard">
            <InputLabel>Username or Email</InputLabel>
            <Input name="login" onChange={userHandler}
            />
        </FormControl>

        <FormControl variant="standard">
            <InputLabel>Password</InputLabel>
            <Input
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
        <Button  onClick={clickHandler} variant="contained" size="small" endIcon={<AppRegistrationIcon/>}>
            Sign in
        </Button>
    </div>
    )
}