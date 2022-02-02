import produce, { Draft } from "immer"
import { LoadingState } from "../../types/TweetsTypes"
import { IUserState, UserActions, UserActionTypes } from "../../types/UserTypes"



const initialState: IUserState = {
    data: undefined,
    loadingState: LoadingState.NEVER
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

        default:
            return draft
    }
}, initialState)