export interface Itodo {
    title:string,
    id: number,
    completed:boolean
}

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
export interface IUserToken {
    "username":string
    "roles":String[]
}

export interface IUserContext {
    userToken:IUserToken
    setUserToken: (user: IUserToken|null) => void;
}
