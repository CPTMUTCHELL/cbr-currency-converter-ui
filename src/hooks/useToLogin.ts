import {useCallback, useContext} from "react";
import {UserContext} from "../functions/UserContext";
import {useNavigate} from "react-router-dom";

export const useToLogin = () => {
    const {setUserToken}  = useContext(UserContext);
    const navigate = useNavigate();
    const performLogout = useCallback((message:string) => {
        localStorage.clear();
        navigate("/login", {state: {msg: message }} );
        setUserToken({username:"",roles:[]})
    }, [])
    return {performLogout};

}