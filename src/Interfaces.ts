export interface IUser {
    username:string,
    password: string
}

export interface IToken {
    accessToken:string,
    refreshToken: string,
}
export interface IConvert {
    "id"?:number
    "baseCurrency": string
    "quantityToConvert": number,
    "targetCurrency": string,
    "result":number
    "date"?:Date

}

export interface IHistoryPage {
    "totalPages":number
    "totalElements":number
    dto:IConvert[]
}
export interface IRole{
    id?:number
    name: string
    isRevoked?:boolean
    isAdded?:boolean

}
export interface IUserToken {
    "id"?:number,
    "username":string
    "roles":IRole[]
}

export interface IUserContext {
    userToken:IUserToken
    setUserToken: (user: IUserToken|null) => void;
}
export interface ICurrency {
    "date": Date
    "id": string,
    "numCode": number,
    "charCode": string,
    "nominal": number,
    "name": string,
    "value": number
}
