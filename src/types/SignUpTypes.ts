import { LoadingState } from "./TweetsTypes";
import { IDBUser } from "./UserTypes";



export interface ISignUpState {
    data: IDBUser | undefined
    loadingState: LoadingState
}


export enum SignUpActionTypes {
    SET_SIGNUP_DATA = "signup/SET_SIGNUP_DATA",
    SET_LOADING = "signup/SET_LOADING"
}

export interface ISetSignupDataAction {
    type: SignUpActionTypes.SET_SIGNUP_DATA
    payload: IDBUser
}

export interface ISetSignupLoadingAction {
    type: SignUpActionTypes.SET_LOADING
    payload: LoadingState
}



export type SignUpActions = ISetSignupDataAction | ISetSignupLoadingAction