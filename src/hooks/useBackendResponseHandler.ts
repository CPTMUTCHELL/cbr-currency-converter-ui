import {CustomError} from "src/functions/axiosFunction";
import {useToLogin} from "src/hooks/useToLogin";
import {useContext} from "react";
import {ErrorContext, IErrorContext} from "src/functions/ErrorContext";

interface IUseBackendResponse {
    setLoading: (loading: boolean) => void;

}

export const useBackendResponseHandler = ({setLoading}: IUseBackendResponse): any => {
    const {setError, setShow} = useContext(ErrorContext) as IErrorContext;

    const {performLogout} = useToLogin()
    const responseHandlerFunc = async (backendCall: () => Promise<any>) => {
        try {
            setLoading(true)
            await backendCall()
        } catch (e: any) {
            setError(e.message)
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
