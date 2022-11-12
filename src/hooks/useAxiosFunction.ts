import {useState} from "react";
import axios from "axios";

interface IAxiosProps<U> {
    url: string
    method: "POST" | "PUT" | "GET" | "DELETE";
    headers?: any
    data?: U
}

interface IAxiosResponse<T> {
    response?: {data:T, status:number}
    error?: string
}

export const useAxiosFunction = <U, T=never>(config: IAxiosProps<U>): [boolean, ((data?: U, changingUrl?:string) => Promise<IAxiosResponse<T>>)] => {
    let response:IAxiosResponse<T> | undefined

    const [loading, setLoading] = useState<boolean>(false);

    const axiosFetch = async (data?: U,changingUrl?:string): Promise<IAxiosResponse<T>> => {
        config = {...config, url: (changingUrl) ? changingUrl : config.url,  data: data}
        try {
            setLoading(true)
            const res = await axios.request(config);
            return  {response: {data:res.data,status:res.status}}
        } catch (e: any) {
            if (e.response.data.errors !==undefined) //Entity validation message
            return {...response, error: e.response.data.errors}
            else if (e.response.data.message !==undefined) return {...response, error: e.response.data.message}
            else return {...response, error: e.response}

        } finally {
            setLoading(false)
        }
    }
    return [loading, axiosFetch];
};