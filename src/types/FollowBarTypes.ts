import { IUser, LoadingState } from "./TweetsTypes";
import { IDBUser } from "./UserTypes";


export interface IFollowBarState {
    items: IDBUser[]
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
    payload: IDBUser[]
}
export interface ISetFollowBarLoadingAction {
    type: FollowBarActionTypes.SET_LOADING
    payload: LoadingState
}


export type FollowBarActions =
    ISetFollowBarUsersAction | IFetchFollowBarUsersAction | ISetFollowBarLoadingAction