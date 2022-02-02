import { LoadingState } from "./TweetsTypes";

export interface IDBUser {
    _id?: string,
    email: string
    fullName: string
    username: string
    location: string
    password: string
    confirmed: boolean
    confirmHash: string
    about: string
    website: string
}


export interface IUserState {
    data: IDBUser | undefined
    loadingState: LoadingState
}


export enum UserActionTypes {
    SET_USER_DATA = "user/SET_USER_DATA",
    SET_LOADING = "user/SET_LOADING"
}

export interface ISetUserDataAction {
    type: UserActionTypes.SET_USER_DATA
    payload: IDBUser
}

export interface ISetUserLoadingAction {
    type: UserActionTypes.SET_LOADING
    payload: LoadingState
}


export type UserActions = ISetUserDataAction | ISetUserLoadingAction