import {CustomError} from "src/functions/axiosFunction";
import {useToLogin} from "src/hooks/useToLogin";
import {useContext} from "react";
import {INotificationContext, NotificationContext} from "src/functions/Contexts";
import {IBackendResponseNotification} from "@/Interfaces";

interface IUseBackendResponse {
    setLoading: (loading: boolean) => void;

}

export const useBackendResponseHandler = ({setLoading}: IUseBackendResponse) => {
    const {setMessage, setShow, setAlertType} = useContext(NotificationContext) as INotificationContext;

    const {performLogout} = useToLogin()
    const responseHandlerFunc = async (backendCall:any,notificationProps?:IBackendResponseNotification) => {

        try {
            setLoading(true)
            await backendCall()
            if (notificationProps && notificationProps.alertProp){
                setMessage(notificationProps.alertProp.message)
                setAlertType(notificationProps.alertProp.alertType)
                setShow(true)
            }
        } catch (e: any) {
            setMessage(notificationProps && notificationProps.customErrorMsg ?  notificationProps.customErrorMsg: e.message)
            setAlertType( "error")
            setShow(true)
            if (e instanceof CustomError) {
                performLogout()
            }

        } finally {
            setLoading(false)
        }

    }

    return {responseHandlerFunc}
}

