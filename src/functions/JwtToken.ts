import axios from "axios";
import {IToken, IUserToken} from "../Interfaces";
import jwtDecode from "jwt-decode";
import {singletonTokenInstance} from "./Tokens";
interface MyToken {
    sub: string;
    exp: number;
    roles:String[]

}
export function JwtToken (accessToken:string)  {
    const API_URL = "http://localhost:8081/auth/token";
    const refreshToken = singletonTokenInstance.getToken().refresh
    const decodedAccessToken=jwtDecode<MyToken>(accessToken)
    const decodedRefreshToken=jwtDecode<MyToken>(refreshToken)

    if (Date.now() >= decodedAccessToken.exp * 1000) {
        if (Date.now() >= decodedRefreshToken.exp * 1000){
                localStorage.clear();
                window.location.href = '/login';
            }
       else {
            axios
                .get<IToken>(API_URL, {headers: {"Authorization": `Bearer ${refreshToken}`}})
                .then((res) => {
                    singletonTokenInstance.setToken({"access": res.data.accessToken,"refresh": res.data.refreshToken})

                })
        }
    }
}
export  function getUser(accessToken:string):IUserToken {
    const decodedAccessToken=jwtDecode<MyToken>(accessToken)
    return {username:decodedAccessToken.sub,roles:decodedAccessToken.roles}
}