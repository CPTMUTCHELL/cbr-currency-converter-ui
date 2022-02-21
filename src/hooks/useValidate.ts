import axios from "axios";
import {JwtToken} from "../functions/JwtToken";
import {useCallback} from "react";
import {useToLogin} from "./useToLogin";

export const useValidate = () => {
    const {performLogout} = useToLogin();

    const performValidation = useCallback((token: string) => {

        const API_URL = "http://localhost:8081/auth/validate";
        axios
            .get<boolean>(API_URL, {headers: {"Authorization": `Bearer ${token}`}})
            .catch((err) => {
                const errMsg= err.response.data.error_message
                if (errMsg.includes("Signature")) {
                    performLogout(errMsg)
                } else if (errMsg.includes("Expired")) {
                    JwtToken(token)
                }
            })
    }, [])
    return {performValidation};
}