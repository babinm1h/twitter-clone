import { Dispatch } from "react";
import { ILoginData } from "../../components/LoginPage/LoginModal/LoginModal";
import { AuthApi } from "../../services/api/auth";
import { TweetsApi } from "../../services/api/tweets";
import { ITweet, LoadingState } from "../../types/TweetsTypes";
import { IDBUser, ILikeTweetAction, ILogoutAction, ISetUserDataAction, ISetUserLoadingAction, IUnLikeTweetAction, UserActions, UserActionTypes } from "../../types/UserTypes";



export const setUserData = (payload: IDBUser): ISetUserDataAction => ({ type: UserActionTypes.SET_USER_DATA, payload })

export const setUserLoading = (payload: LoadingState): ISetUserLoadingAction => ({ type: UserActionTypes.SET_LOADING, payload })

export const userLogout = (): ILogoutAction => ({ type: UserActionTypes.LOGOUT })

export const likeTweet = (payload: string): ILikeTweetAction => ({ type: UserActionTypes.LIKE_TWEET, payload })

export const unlikeTweet = (payload: string): IUnLikeTweetAction => ({ type: UserActionTypes.UNLIKE_TWEET, payload })




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

export const logout = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            localStorage.removeItem("token")
            dispatch(userLogout())
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

export const likeTweetThunk = (tweetId: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setUserLoading(LoadingState.LIKE))
            await TweetsApi.like(tweetId)
            dispatch(likeTweet(tweetId))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}

export const unlikeTweetThunk = (tweetId: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setUserLoading(LoadingState.LIKE))
            await TweetsApi.unlike(tweetId)
            dispatch(unlikeTweet(tweetId))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}