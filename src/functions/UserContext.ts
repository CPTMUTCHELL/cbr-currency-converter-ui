import { createContext } from 'react';
import {IUserContext} from "../Interfaces";
const defaultUserCtx:IUserContext={
    userToken:{
        username:"",
        roles:[]
    },
    setUserToken:() =>{}
}
export const UserContext = createContext<IUserContext>(defaultUserCtx);
