import produce, { Draft } from "immer";
import { ITweet, LoadingState } from "../../types/TweetsTypes";
import { ITweetState, TweetActions, TweetActionTypes } from "../../types/TweetTypes";


const initialState: ITweetState = {
    data: null,
    loadingState: LoadingState.NEVER
}

export const TweetReducer = produce((draft: Draft<ITweetState>, action: TweetActions) => {

    switch (action.type) {

        case TweetActionTypes.FETCH_DATA:
            draft.data = null
            draft.loadingState = LoadingState.LOADING
            break

        case TweetActionTypes.SET_DATA:
            draft.data = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        default:
            return draft
    }

}, initialState)