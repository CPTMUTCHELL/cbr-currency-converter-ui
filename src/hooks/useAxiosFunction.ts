import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
interface IAxiosProps<U> {
    url:string
    method: "POST" | "PUT" | "GET" | "DELETE";
    headers?: any
    data?:U
}

export const useAxiosFunction = <T,U>(config:IAxiosProps<U>):[T | undefined,string | undefined,boolean, (data?:U)=>void] => {
    const [response, setResponse] = useState<T| undefined>(undefined);
    const [error, setError] = useState<string| undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const  axiosFetch = async (data?:U) => {
        config= {...config,data:data}

        try {
            setLoading(true)
            const result = await axios.request(config);
            setResponse(result.data);
        } catch( err) {
            // @ts-ignore
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }
    return [response, error, loading,axiosFetch];
};