import { ITweetsState, LoadingState, TweetsActions, TweetsActionTypes } from "../../types/TweetsTypes"
import produce, { Draft } from "immer"


const initialState: ITweetsState = {
    items: [],
    loadingState: LoadingState.NEVER,
    userTweets: []
}


export const tweetsReducer = produce((draft: Draft<ITweetsState>, action: TweetsActions) => {

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
            draft.items.unshift(action.payload)
            draft.loadingState = LoadingState.LOADED
            break

        case TweetsActionTypes.DELETE_TWEET:
            draft.items = draft.items.filter(i => i._id !== action.payload)
            break

        case TweetsActionTypes.GET_USER_TWEETS:
            draft.userTweets = action.payload
            draft.loadingState = LoadingState.LOADED
            break



        default:
            return draft

    }

}, initialState)