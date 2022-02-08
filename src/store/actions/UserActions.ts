import { Dispatch } from "react";
import { ILoginData } from "../../components/LoginPage/LoginModal/LoginModal";
import { AuthApi } from "../../services/api/auth";
import { ProfileApi } from "../../services/api/profile";
import { TweetsApi } from "../../services/api/tweets";
import { UploadApi } from "../../services/api/upload";
import { ITweet, LoadingState } from "../../types/TweetsTypes";
import { IDBUser, ILikeTweetAction, ILogoutAction, ISetUserAbout, ISetUserDataAction, ISetUserLoadingAction, IUnLikeTweetAction, IUploadAvatarAction, UserActions, UserActionTypes } from "../../types/UserTypes";



export const setUserData = (payload: IDBUser): ISetUserDataAction => ({ type: UserActionTypes.SET_USER_DATA, payload })

export const setUserLoading = (payload: LoadingState): ISetUserLoadingAction => ({ type: UserActionTypes.SET_LOADING, payload })

export const userLogout = (): ILogoutAction => ({ type: UserActionTypes.LOGOUT })

export const likeTweet = (payload: string): ILikeTweetAction => ({ type: UserActionTypes.LIKE_TWEET, payload })

export const unlikeTweet = (payload: string): IUnLikeTweetAction => ({ type: UserActionTypes.UNLIKE_TWEET, payload })

export const uploadAvatar = (payload: string): IUploadAvatarAction => ({ type: UserActionTypes.UPLOAD_AVATAR, payload })

export const setUserAbout = (payload: string): ISetUserAbout => ({ type: UserActionTypes.SET_ABOUT, payload })


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


export const updateTweet = (tweetId: string, payload: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            await TweetsApi.update(tweetId, payload)
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}

export const uploadAvatarThunk = (payload: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(uploadAvatar(payload))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}


export const setUserAboutThunk = (payload: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            await ProfileApi.setAbout(payload)
            dispatch(setUserAbout(payload))
        } catch (err) {
            dispatch(setUserLoading(LoadingState.ERROR))
        }
    }
}