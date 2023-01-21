import React, {useEffect, useState} from "react";
import {Box, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IUser} from "@/Interfaces";
import "./scss/SignForm.scss"
import {Service} from "src/functions/Service";
import {useBackendResponseHandler} from "@/hooks/useBackendResponseHandler";
import {LoadingButton} from "@mui/lab";


interface IValidation{
    email: boolean,
    username: boolean,
    password: boolean
}
const validationObj:IValidation ={
    email:false,
    password:false,
    username:false
}


export const SignUpForm: React.FC = () => {
    const [signUpUser, setSignUpUser] = useState<IUser>({username:"",email:"",password:""})
    const [showPass, setShowPass] = useState<boolean>(false)
    const [validation, setValidation] = useState<IValidation>(validationObj)
    const [loading, setLoading] = useState(false)
    const [successfulRegistration, setSuccessfulRegistration] = useState(false)
    const {responseHandlerFunc} = useBackendResponseHandler({setLoading});
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpUser({...signUpUser, [e.target.name]: e.target.value});
    }

    // probably shitty code (validation)
    useEffect(() => {
        if (signUpUser.email.length > 0 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpUser.email)))
            setValidation(prevState => ({...prevState, email: true}))
        else setValidation(prevState => ({...prevState, email: false}))

        if (signUpUser.username.length > 4)
            setValidation(prevState => ({...prevState, username: true}))
        else setValidation(prevState => ({...prevState, username: false}))


        if ( signUpUser.password.length > 4)
            setValidation(prevState => ({...prevState, password: true}))
        else setValidation(prevState => ({...prevState, password: false}))


    }, [signUpUser])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await responseHandlerFunc(async () => {
                const res = await Service.signUp(signUpUser)
                if (res.status >= 200 && res.status < 400) {
                    setSuccessfulRegistration(true)

                }
            }, {alertProp: {message: "You've been registered", alertType: "success"}}
        )
    }
    return (

        <Box className="sign-form">
            <Box className="input-form">
                <FormControl error={!validation.email && signUpUser.email.length!=0} variant="standard">
                    <InputLabel error={!validation.email&& signUpUser.email.length!=0}>Email</InputLabel>

                    <Input name="email" onChange={handleFormChange} value={signUpUser.email}/>
                    {!validation.email && signUpUser.email.length!=0 ? <FormHelperText>Email format is not valid</FormHelperText> : null}

                </FormControl>
                <FormControl error={!validation.username && signUpUser.username.length!=0} variant="standard">
                    <InputLabel error={!validation.username && signUpUser.username.length!=0}>Username</InputLabel>
                    <Input name="username" onChange={handleFormChange} value={signUpUser.username}/>
                    {!validation.username  && signUpUser.username.length!=0 ? <FormHelperText>Username must be longer than 4 chars</FormHelperText> : null}
                </FormControl>
                <FormControl error={!validation.password && signUpUser.password.length!=0} variant="standard">
                    <InputLabel error={!validation.password && signUpUser.password.length!=0}>Password</InputLabel>
                    <Input
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={signUpUser.password}
                        onChange={handleFormChange}
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
                    {!validation.password && signUpUser.password.length!=0?
                        <FormHelperText>Password must be longer than 4 chars</FormHelperText> : null}

                </FormControl>
            </Box>
            {successfulRegistration ? <p>Confirm registration via link, sent to your email.</p> :<LoadingButton loading={loading}  disabled={!(validation.email && validation.username && validation.password)} onClick={handleSubmit} variant="contained" size="small"
                           endIcon={<AppRegistrationIcon/>}>
                Sign up
            </LoadingButton>}

            {/*<Divider variant="middle" >or</Divider>*/}

        </Box>
    )
}