import { Dispatch } from "react";
import { FollowBarApi } from "../../services/api/followBar";
import { FollowBarActions, FollowBarActionTypes, IFetchFollowBarUsersAction, ISetFollowBarLoadingAction, ISetFollowBarUsersAction } from "../../types/FollowBarTypes";
import { LoadingState } from "../../types/TweetsTypes";
import { IDBUser } from "../../types/UserTypes";


export const fetchFollowBarUsers = (): IFetchFollowBarUsersAction => ({ type: FollowBarActionTypes.FETCH_USERS })

export const setFollowBarUsers = (payload: IDBUser[]): ISetFollowBarUsersAction => ({ type: FollowBarActionTypes.SET_USERS, payload })


export const setFollowBarLoading = (payload: LoadingState): ISetFollowBarLoadingAction => ({ type: FollowBarActionTypes.SET_LOADING, payload })

// ============================================ THUNKS

export const fetchUsers = () => {
    return async (dispatch: Dispatch<FollowBarActions>) => {
        try {
            dispatch(fetchFollowBarUsers())
            const data = await FollowBarApi.fetchFollowBarUsers()
            dispatch(setFollowBarUsers(data.data.data))
        } catch (err) {
            dispatch(setFollowBarLoading(LoadingState.ERROR))
        }
    }
}