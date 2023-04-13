
export interface IUser {
    id:number
    email:string
    username:string,
    password: string
    verified:boolean,
    roles:IRole[]
}

export interface IToken {
    accessToken:string,
    refreshToken: string,
}
export interface IConvert {
    "id":number
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

export type alertTypes = 'error' | 'info' | 'success' | 'warning'
export interface IAlertMessage{
    message:string,
    alertType:alertTypes
}
export interface IBackendResponseNotification {
    customErrorMsg?:string
    alertProp?:IAlertMessage
}

//history
export type sortFieldType = "date" | "baseCurrency" | "targetCurrency" | "quantityToConvert" | "result"
type sortDirType = "asc" | "desc"

interface ISort {
    dir:sortDirType
    sortField:sortFieldType
}
interface IFilter {
    baseCurrency:string
    targetCurrency:string
    date:string
}
interface IPage {
    currentPageNumber: number
    pageSize: 5 | 10 | 25
}

export type Action =
    {type:"PAGE", payload: IPage } |
    {type:"SORT", payload: ISort} |
    {type:"FILTER", payload: {name:string,value:string}}

export interface IHistoryParams extends ISort,IFilter,IPage {}
