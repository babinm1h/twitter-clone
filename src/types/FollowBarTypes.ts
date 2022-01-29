import { IUser, LoadingState } from "./TweetsTypes";


export interface IFollowBarState {
    items: IUser[]
    loadingState: LoadingState
}

export enum FollowBarActionTypes {
    SET_USERS = "followbar/SET_USERS",
    FETCH_USERS = "followbar/FETCH_USERS",
    SET_LOADING = "followbar/SET_LOADING",
}


export interface IFetchFollowBarUsersAction {
    type: FollowBarActionTypes.FETCH_USERS
}
export interface ISetFollowBarUsersAction {
    type: FollowBarActionTypes.SET_USERS
    payload: IUser[]
}


export type FollowBarActions = ISetFollowBarUsersAction | IFetchFollowBarUsersAction