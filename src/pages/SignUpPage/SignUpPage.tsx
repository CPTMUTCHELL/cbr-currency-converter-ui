import React, {useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {IUser} from "@/Interfaces";
import {useNavigate} from 'react-router-dom';
import './scss/SignUpPage.scss';

interface IError {
    "usernameError": string,
    "passwordError": string
    "validated": boolean,
    "noError": boolean
    "errorMsg": string

}

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(Object)
    const [error, setError] = useState<IError>({
        usernameError: "",
        passwordError: "",
        validated: true,
        noError: false,
        errorMsg: ""
    })
    const REGISTER_URL = "/backend/auth/registration"

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setUser({...user, [field]: target.value});
        switch (field) {
            case 'username':
                if (target.value.length < 5) {

                    setError({
                        ...error,
                        usernameError: "Username must be at least 5 characters long!"
                    });
                } else setError({
                    ...error,
                    usernameError: ""
                });
                break;
            case 'password':
                if (target.value.length < 5) {
                    setError(prevState => ({
                        ...prevState,
                        passwordError: "Password must be at least 5 characters long!"
                    }));
                } else setError(prevState => ({
                    ...prevState,
                    passwordError: ""
                }));
                break;


        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (error?.usernameError === "" && error?.passwordError === "") {
            setError(prevState => ({
                ...prevState,
                validated: true
            }));
            axios
                .post<IUser>(REGISTER_URL, user)
                .then((res: AxiosResponse) => {
                    if (res.status >= 200 && res.status < 400) setError(prevState => ({
                        ...prevState,
                        noError: true

                    }));
                    navigate("/login", {state: {msg: "You've been registered"}});
                }).catch((reason: AxiosError) => {
                setError({
                    ...error,
                    errorMsg: reason.response?.data.message, noError: false
                });

            })
        } else setError({
            ...error,
            validated: false
        });

    }


    return (
        <>
            <div className='signup-container'>
                <h1 className="alg">Sign Up</h1>

                    <form>

                            <label>
                                <p>Username</p>
                                <input onPaste={handleChange('username')} type='text'
                                       onChange={handleChange('username')}/>
                            </label>
                        {error?.usernameError != "" &&  <p className="error">{error?.usernameError}</p>}
                            <label>
                                <p>Password</p>
                                <input onPaste={handleChange('password')} type='password'
                                       onChange={handleChange('password')}/>
                            </label>
                        {error?.passwordError != "" && <p className="error">{error?.passwordError}</p>}

                        <div className="signup-error">
                            {!error.validated && <p style={{color: "red"}}>You cannot be registered!!!</p>}
                            {error.noError && <p style={{color: "red"}}>You've been registered</p>}
                            {error.errorMsg && <p style={{color: "red"}}>{error.errorMsg}</p>}
                        </div>
                    </form>
                <button type="submit" onClick={handleSubmit}>Register Me</button>


            </div>
        </>
    )
}
