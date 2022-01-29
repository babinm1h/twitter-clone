import { Dispatch } from "react";
import { FollowBarApi } from "../../services/api/followBar";
import { FollowBarActions, FollowBarActionTypes, IFetchFollowBarUsersAction, ISetFollowBarUsersAction } from "../../types/FollowBarTypes";
import { IUser } from "../../types/TweetsTypes";


export const fetchFollowBarUsers = (): IFetchFollowBarUsersAction => ({ type: FollowBarActionTypes.FETCH_USERS })

export const setFollowBarUsers = (payload: IUser[]): ISetFollowBarUsersAction => ({ type: FollowBarActionTypes.SET_USERS, payload })




// ============================================ THUNKS

export const fetchFollowBarUsersThunk = () => {
    return async (dispatch: Dispatch<FollowBarActions>) => {
        dispatch(fetchFollowBarUsers())
        const data = await FollowBarApi.fetchFollowBarUsers()
        dispatch(setFollowBarUsers(data.data))
    }
}