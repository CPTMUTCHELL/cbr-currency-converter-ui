import {createContext} from 'react';
import {alertTypes, IUserContext} from "@/Interfaces";

const defaultUserCtx:IUserContext={
    userToken:{
        username:"",
        roles:[]
    },
    setUserToken:() =>{}
}
export const UserContext = createContext<IUserContext>(defaultUserCtx);

export interface INotificationContext {
    message:string | undefined
    setMessage: (message:string) => void;
    show:boolean
    setShow: (show:boolean) => void;
    alertType: alertTypes
    setAlertType: (alertType:alertTypes) =>void
}
export const NotificationContext = createContext<INotificationContext | null>(null);
