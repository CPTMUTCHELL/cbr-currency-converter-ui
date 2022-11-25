import axios from "axios";

interface IAxiosProps<U> {
    url: string
    method: "POST" | "PUT" | "GET" | "DELETE";
    headers?: any
    data?: U
}

export interface IAxiosResponse<T> {
    response?: { data: T, status: number }
    error?: string
}

export const axiosFunction = async <U, T>(config: IAxiosProps<U>): Promise<IAxiosResponse<T>> => {
    try {
        const res = await axios.request(config);
        return {response: {data: res.data, status: res.status}}
    } catch (e: any) {
         if (e.response.data.message !==undefined) return {error: e.response.data.message}
        else return {error: e.response}
    }

}