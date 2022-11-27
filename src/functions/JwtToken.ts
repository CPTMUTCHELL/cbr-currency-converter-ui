import {IUserToken} from "@/Interfaces";
import jwtDecode from "jwt-decode";
import {singletonTokenInstance} from "./Tokens";
import {Service} from "src/functions/Service";

interface MyToken {
    sub: string;
    exp: number;
    roles: {
        name: string
    }[]

}

export async function JwtToken(accessToken: string): Promise< string | undefined> {
    const decodedAccessToken = jwtDecode<MyToken>(accessToken)

    if (Date.now() >= decodedAccessToken.exp * 1000) {
        const res = await Service.refreshToken()
            singletonTokenInstance.setToken({
                "access": res.data.accessToken,
                "refresh": res.data.refreshToken
            })
            return res.data.accessToken

    }

}

export function getUser(accessToken: string): IUserToken {
    const decodedAccessToken = jwtDecode<MyToken>(accessToken)
    return {username: decodedAccessToken.sub, roles: decodedAccessToken.roles}
}