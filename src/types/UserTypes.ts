import { ITweet, LoadingState } from "./TweetsTypes";

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
    likes?: string[]
}


export interface IUserState {
    data: IDBUser | undefined
    loadingState: LoadingState
}


export enum UserActionTypes {
    SET_USER_DATA = "user/SET_USER_DATA",
    SET_LOADING = "user/SET_LOADING",
    SET_ERROR = "user/SET_ERROR",
    LOGOUT = "user/LOGOUT",
    LIKE_TWEET = "user/LIKE_TWEET",
    UNLIKE_TWEET = "user/UNLIKE_TWEET"
}

export interface ISetUserDataAction {
    type: UserActionTypes.SET_USER_DATA
    payload: IDBUser
}
export interface ISetUserLoadingAction {
    type: UserActionTypes.SET_LOADING
    payload: LoadingState
}
export interface ILogoutAction {
    type: UserActionTypes.LOGOUT
}
export interface ILikeTweetAction {
    type: UserActionTypes.LIKE_TWEET
    payload: string
}
export interface IUnLikeTweetAction {
    type: UserActionTypes.UNLIKE_TWEET
    payload: string
}


export type UserActions = ISetUserDataAction | ISetUserLoadingAction |
    ILogoutAction | ILikeTweetAction | IUnLikeTweetAction