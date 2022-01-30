import { ITweetsState, LoadingState, TweetsActions, TweetsActionTypes } from "../../types/TweetsTypes"
import produce, { Draft } from "immer"


const initialState: ITweetsState = {
    items: [],
    loadingState: LoadingState.NEVER
}


export const TweetsReducer = produce((draft: Draft<ITweetsState>, action: TweetsActions) => {

    switch (action.type) {

        case TweetsActionTypes.SET_TWEETS:
            draft.items = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        case TweetsActionTypes.FETCH_TWEETS:
            draft.items = []
            draft.loadingState = LoadingState.LOADING
            break

        case TweetsActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        case TweetsActionTypes.ADD_TWEET:
            draft.items.push(action.payload)
            break




        default:
            return draft

    }

}, initialState)