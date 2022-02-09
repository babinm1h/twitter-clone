import produce, { Draft } from "immer"
import { LoadingState } from "../../types/TweetsTypes"
import { IUserState, UserActions, UserActionTypes } from "../../types/UserTypes"



const initialState: IUserState = {
    data: undefined,
    loadingState: LoadingState.NEVER,
}


export const userReducer = produce((draft: Draft<IUserState>, action: UserActions) => {
    switch (action.type) {

        case UserActionTypes.SET_USER_DATA:
            draft.data = action.payload
            draft.loadingState = LoadingState.SUCCESS
            break

        case UserActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        case UserActionTypes.LOGOUT:
            draft.loadingState = LoadingState.LOADED
            draft.data = undefined
            break


        case UserActionTypes.LIKE_TWEET:
            draft.data?.likes?.push(action.payload)
            draft.loadingState = LoadingState.LOADED
            break

        case UserActionTypes.UNLIKE_TWEET:
            if (draft?.data?.likes) {
                draft.data.likes = draft.data?.likes?.filter(i => i !== action.payload)
            }
            draft.loadingState = LoadingState.LOADED
            break

        case UserActionTypes.UPLOAD_AVATAR:
            if (draft.data) {
                draft.data.avatarUrl = action.payload
            }
            break

        case UserActionTypes.SET_ABOUT:
            if (draft.data) {
                draft.data.about = action.payload
            }
            break

        case UserActionTypes.FOLLOW:
            if (draft.data) {
                draft.data.following.push(action.payload)
            }
            break

        case UserActionTypes.UNFOLLOW:
            if (draft.data) {
                draft.data.following = draft.data.following.filter(i => i !== action.payload)
            }
            break

        default:
            return draft
    }
}, initialState)

