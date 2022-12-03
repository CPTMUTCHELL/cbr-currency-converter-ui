import axios from "axios";

interface IAxiosProps<U> {
    url: string
    method: "POST" | "PUT" | "GET" | "DELETE";
    headers?: any
    data?: U
    params?:any
}

export interface IAxiosResponse<T> {
    data: T,
    status: number
}

export const axiosFunction = async <U, T>(config: IAxiosProps<U>): Promise<IAxiosResponse<T>> => {

    try {
        const res = await axios.request(config);
        return {data: res.data, status: res.status}
    } catch (e: any) {

        if (e.response.data.message !==undefined){
            if (config.url.includes("/token")) throw new CustomError(e.response.data.message,e.response.data.message)
            else throw new Error(e.response.data.message)
        }
        else throw new Error(e.response.data)
    }

}

export class CustomError extends Error{
    tokenErr:string
    constructor(message: string,custom:string) {
        super(message);
       this.tokenErr= custom
        Object.setPrototypeOf(this, CustomError.prototype);

    }
}