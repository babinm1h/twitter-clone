import produce from "immer";
import { FollowBarActions, FollowBarActionTypes, IFollowBarState } from "../../types/FollowBarTypes";
import { LoadingState } from "../../types/TweetsTypes";



const initialState: IFollowBarState = {
    items: [],
    loadingState: LoadingState.NEVER
}


export const followBarReducer = produce((draft, action: FollowBarActions) => {

    switch (action.type) {

        case FollowBarActionTypes.FETCH_USERS:
            draft.items = []
            draft.loadingState = LoadingState.LOADING
            break

        case FollowBarActionTypes.SET_USERS:
            draft.items = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        case FollowBarActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        default:
            return draft
    }



}, initialState)