import {useCallback, useContext} from "react";
import {INotificationContext, NotificationContext, UserContext} from "../functions/Contexts";
import {useNavigate} from "react-router-dom";

export const useToLogin = () => {
    const {setUserToken}  = useContext(UserContext);
    const {setMessage, setShow, setAlertType} = useContext(NotificationContext) as INotificationContext;

    const navigate = useNavigate();
    const performLogout = useCallback((message?:string) => {
        localStorage.clear();
        if (message) {
            setShow(true)
            setAlertType("info")
            setMessage(message)
        }
        navigate("/login");
        setUserToken({username:"",roles:[]})
    }, [])
    return {performLogout};

}