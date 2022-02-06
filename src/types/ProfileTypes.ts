import { LoadingState } from "./TweetsTypes";
import { IDBUser } from "./UserTypes";


export interface IProfileState {
    data: IDBUser | undefined
    loadingState: LoadingState
}

export enum ProfileActionTypes {
    SET_DATA = "/profile/SET_DATA",
    SET_LOADING = "/profile/SET_LOADING",
}


export interface ISetProfileDataAction {
    type: ProfileActionTypes.SET_DATA
    payload: IDBUser
}
export interface ISetProfileLoadingAction {
    type: ProfileActionTypes.SET_LOADING
    payload: LoadingState
}


export type ProfileActions = ISetProfileDataAction | ISetProfileLoadingAction