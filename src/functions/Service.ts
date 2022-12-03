import {axiosFunction, IAxiosResponse} from "./axiosFunction"
import {IConvert, ICurrency, IHistoryPage, IHistoryParams, IToken, IUser, IUserToken} from "@/Interfaces";
import {singletonTokenInstance} from "src/functions/Tokens";
import {JwtToken} from "src/functions/JwtToken";

const CURRENCIES_URL = "backend/convert/currencies";
const CONVERT_URL = "backend/convert/convert";
const LOGIN_URL = 'backend/auth/login'
const REGISTRATION_URL = "/backend/auth/registration"
const USERS_URL = "backend/auth/admin/users";
const UPDATE_ROLES_URL = "backend/auth/admin/roles"
const REFRESH_TOKEN_URL = "backend/auth/token";
const HISTORY_URL = `/backend/history/show`

class _Service {
    //history
    public async getHistoryPage(params:IHistoryParams,page:number): Promise<IAxiosResponse<IHistoryPage>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access);
        return await axiosFunction({
            method: "GET",
            url: HISTORY_URL +  `/${page}`,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`},
            params: params

        });
    }

    //convert
    public async getCurrencies(): Promise<IAxiosResponse<ICurrency[]>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access);
        return await axiosFunction({
            method: "GET",
            url: CURRENCIES_URL,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`}
        });
    }

    public async convert(payload: Omit<IConvert,"id">): Promise<IAxiosResponse<IConvert>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access);

        return await axiosFunction({
            method: "POST",
            url: CONVERT_URL,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`},
            data: payload
        });
    }

    //login
    public async signIn(payload: IUser): Promise<IAxiosResponse<IToken>> {
        return await axiosFunction({
            method: "POST",
            url: LOGIN_URL,
            data: payload
        });
    }

    //registration
    public async signUp(payload: IUser): Promise<IAxiosResponse<IUser>> {
        return await axiosFunction({
            method: "POST",
            url: REGISTRATION_URL,
            data: payload
        });
    }

    //admin
    public async deleteUser(id: number): Promise<IAxiosResponse<any>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access);

        return await axiosFunction({
            method: "DELETE",
            url: USERS_URL + `/${id}`,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`}
        });
    }

    public async getUsers(): Promise<IAxiosResponse<IUserToken[]>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access)
        return await axiosFunction({
            method: "GET",
            url: USERS_URL,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`}
        });


    }

    public async updateUserRoles(payload: IUserToken): Promise<IAxiosResponse<IUserToken>> {
        const token = await JwtToken(singletonTokenInstance.getToken().access);
        return await axiosFunction({
            method: "PUT",
            url: UPDATE_ROLES_URL,
            headers: {"Authorization": `Bearer ${token ?? singletonTokenInstance.getToken().access}`},
            data: payload
        });
    }

    //token
    public async refreshToken(): Promise<IAxiosResponse<IToken>> {
        return await axiosFunction({
            method: "GET",
            url: REFRESH_TOKEN_URL,
            headers: {"Authorization": `Bearer ${singletonTokenInstance.getToken().refresh}`}
        });
    }

}

export const Service = new _Service()