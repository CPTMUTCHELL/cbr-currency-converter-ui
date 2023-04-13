import {IUser} from "@/Interfaces";

export type SortOrder = "asc" | "desc"
export type SignInUpType = Pick<IUser, "username" | "password" | "email">
