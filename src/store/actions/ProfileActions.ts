import { Dispatch } from "react";
import { ProfileApi } from "../../services/api/profile";
import { ISetProfileDataAction, ISetProfileLoadingAction, ProfileActions, ProfileActionTypes } from "../../types/ProfileTypes";
import { LoadingState } from "../../types/TweetsTypes";
import { IDBUser } from "../../types/UserTypes";


export const setProfileData = (payload: IDBUser): ISetProfileDataAction => ({ type: ProfileActionTypes.SET_DATA, payload })

export const setProfileLoading = (payload: LoadingState): ISetProfileLoadingAction => ({ type: ProfileActionTypes.SET_LOADING, payload })



// ===================================== THUNKS
export const fetchProfileData = (userId: string) => {
    return async (dispatch: Dispatch<ProfileActions>) => {
        try {
            dispatch(setProfileLoading(LoadingState.LOADING))
            const res = await ProfileApi.getProfile(userId)
            dispatch(setProfileData(res.data.data))
        } catch (err) {
            dispatch(setProfileLoading(LoadingState.NEVER))
        }
    }
}