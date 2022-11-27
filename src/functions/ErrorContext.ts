import {createContext} from 'react';

export interface IErrorContext {
    error:string | undefined
    setError: (error:string) => void;
    show:boolean
    setShow: (show:boolean) => void;
}
export const ErrorContext = createContext<IErrorContext | null>(null);
