import { Dispatch } from "react";
import { ILoginData } from "../../components/LoginPage/LoginModal/LoginModal";
import { AuthApi } from "../../services/api/auth";
import { LoadingState } from "../../types/TweetsTypes";
import { IDBUser, ISetUserDataAction, ISetUserLoadingAction, UserActions, UserActionTypes } from "../../types/UserTypes";



export const setUserData = (payload: IDBUser): ISetUserDataAction => ({ type: UserActionTypes.SET_USER_DATA, payload })

export const setUserLoading = (payload: LoadingState): ISetUserLoadingAction => ({ type: UserActionTypes.SET_LOADING, payload })


// ============================================ THUNKS

export const login = (payload: ILoginData) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setUserLoading(LoadingState.LOADING))
            const res = await AuthApi.signIn(payload)
            localStorage.setItem("token", res.data.data.token)
            dispatch(setUserData(res.data.data.user))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}


export const checkAuth = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setUserLoading(LoadingState.LOADING))
            const res = await AuthApi.getMe()
            dispatch(setUserData(res.data.data))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}
