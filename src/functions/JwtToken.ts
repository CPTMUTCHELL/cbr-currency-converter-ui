import {IUserToken} from "@/Interfaces";
import jwtDecode from "jwt-decode";
import {singletonTokenInstance} from "./Tokens";
import {Service} from "src/functions/Service";

interface MyToken {
    sub: string;
    exp: number;
    roles: {
        name:string
    }[]

}
export async function JwtToken (accessToken:string):Promise<{ token?:string,error?:string } | undefined>  {
    const refreshToken = singletonTokenInstance.getToken().refresh
    const decodedAccessToken=jwtDecode<MyToken>(accessToken)
    const decodedRefreshToken=jwtDecode<MyToken>(refreshToken)

    if (Date.now() >= decodedAccessToken.exp * 1000) {

        {
           const res =await Service.refreshToken()
            if (res.response) {
                singletonTokenInstance.setToken({
                    "access": res.response.data.accessToken,
                    "refresh": res.response.data.refreshToken
                })
                return {token:res.response.data.accessToken}
            }



        }
    }
}

export  function getUser(accessToken:string):IUserToken {
    const decodedAccessToken=jwtDecode<MyToken>(accessToken)
    return {username:decodedAccessToken.sub,roles:decodedAccessToken.roles}
}