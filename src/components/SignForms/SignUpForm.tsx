import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Tooltip
} from "@mui/material";

import WarningIcon from '@mui/icons-material/Warning';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IUser} from "@/Interfaces";
import "./scss/SignForm.scss"
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "src/hooks/useBackendResponseHandler";

export const SignUpForm: React.FC = () => {
    const [signUpUser, setSignUpUser] = useState<IUser>(Object)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [isValidForm,setIsValidForm] = useState<boolean>(true)
    const [loading, setLoading] = useState(true)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpUser({...signUpUser, [e.target.name]: e.target.value});
    }
    // enable/disable sign up button
    useEffect(()=>{
        if (signUpUser.email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpUser.email))
            && signUpUser.username && signUpUser.username.length > 4
            && signUpUser.password && signUpUser.password.length > 4) {
            setIsValidForm(true)
        }
        else setIsValidForm(false)
    },[signUpUser])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

            await responseHandlerFunc(async () => {
                    const res = await Service.signUp(signUpUser)
                    if (res.status >= 200 && res.status < 400) {


                    }
                }, {alertProp: {message: "You've been registered", alertType: "success"}}
            )
        }



    return (
        <Box className="signup">
            <Box className="form">
                <FormControl error={true} variant="standard">
                    <InputLabel error={true}>Email</InputLabel>

                    <Input name="email" onChange={handleFormChange} value={signUpUser.email}/>
                    <FormHelperText>Error</FormHelperText>

                </FormControl>
                <FormControl variant="standard">
                    <InputLabel>Username</InputLabel>
                    <Input name="username" onChange={handleFormChange} value={signUpUser.username}
                           endAdornment={
                               <Tooltip title="Username must be longer than 5 characters">
                                   <WarningIcon/>
                               </Tooltip>
                           }
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel>Password</InputLabel>
                    <Input
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={signUpUser.password}
                        onChange={handleFormChange}
                        endAdornment={

                            <InputAdornment position="end">
                                <Tooltip title="Password must be longer than 5 characters">
                                    <WarningIcon />
                                </Tooltip>
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
            <Button  onClick={handleSubmit} disabled={!isValidForm} variant="contained" size="small" endIcon={<AppRegistrationIcon/>}>
                Sign up
            </Button>

            {/*<Divider variant="middle" >or</Divider>*/}

        </Box>
    )
}