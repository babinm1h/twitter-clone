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
    likes?: string[]
    avatarUrl: string
    followers: string[]
    following: string[]
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
    UNLIKE_TWEET = "user/UNLIKE_TWEET",
    UPLOAD_AVATAR = "user/UPLOAD_AVATAR",
    SET_ABOUT = "user/SET_ABOUT",
    FOLLOW = "user/FOLLOW",
    UNFOLLOW = "user/UNFOLLOW",
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
export interface IUploadAvatarAction {
    type: UserActionTypes.UPLOAD_AVATAR
    payload: string
}
export interface ISetUserAbout {
    type: UserActionTypes.SET_ABOUT
    payload: string
}
export interface IFollowAction {
    type: UserActionTypes.FOLLOW
    payload: string
}
export interface IUnfollowAction {
    type: UserActionTypes.UNFOLLOW
    payload: string
}

export type UserActions = ISetUserDataAction | ISetUserLoadingAction |
    ILogoutAction | ILikeTweetAction | IUnLikeTweetAction | IUploadAvatarAction | ISetUserAbout | IFollowAction | IUnfollowAction