import React, {useState} from 'react';
import {IUser} from "@/Interfaces";
import {useNavigate} from 'react-router-dom';
import './scss/SignUpPage.scss';
import CircularProgress from "@mui/material/CircularProgress";
import {Service} from "src/functions/Service";

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
    const [pageError, setPageError] = useState<IError>({
        usernameError: "",
        passwordError: "",
        validated: true,
        noError: false,
        errorMsg: ""
    })
    const [loading,setLoading]=useState(false)

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setUser({...user, [field]: target.value});
        switch (field) {
            case 'username':
                if (target.value.length < 5) {

                    setPageError({
                        ...pageError,
                        errorMsg:"",
                        usernameError: "Username must be at least 5 characters long!"
                    });
                } else setPageError({
                    ...pageError,
                    usernameError: ""
                });
                break;
            case 'password':
                if (target.value.length < 5) {
                    setPageError(prevState => ({
                        ...prevState,
                        errorMsg:"",
                        passwordError: "Password must be at least 5 characters long!"
                    }));
                } else setPageError(prevState => ({
                    ...prevState,
                    passwordError: ""
                }));
                break;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (pageError?.usernameError === "" && pageError?.passwordError === "") {
            setPageError(prevState => ({
                ...prevState,
                validated: true
            }));
            setLoading(true)
            const res = await Service.signUp(user)
            setLoading(false)
            const {response,error} = res;
            if (response) {
                if (response.status >= 200 && response.status < 400) setPageError(prevState => ({
                    ...prevState,
                    noError: true

                }));
                navigate("/login", {state: {msg: "You've been registered"}});
            }
            if (error) {
                setPageError({
                    ...pageError,
                    errorMsg: error, noError: false
                });
            }

        } else setPageError({
            ...pageError,
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
                        {pageError?.usernameError != "" &&  <p className="error">{pageError?.usernameError}</p>}
                            <label>
                                <p>Password</p>
                                <input onPaste={handleChange('password')} type='password'
                                       onChange={handleChange('password')}/>
                            </label>
                        {pageError?.passwordError != "" && <p className="error">{pageError?.passwordError}</p>}

                        <div className="signup-error">
                            {!pageError.validated && <p style={{color: "red"}}>You cannot be registered!!!</p>}
                            {pageError.noError && <p style={{color: "red"}}>You've been registered</p>}
                            {pageError.errorMsg && <p style={{color: "red"}}>{pageError.errorMsg}</p>}
                        </div>
                    </form>
                {loading ? <CircularProgress/> : <button type="submit" onClick={handleSubmit}>Register me</button>}


            </div>
        </>
    )
}
