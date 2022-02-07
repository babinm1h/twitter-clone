import produce, { Draft } from "immer";
import {  LoadingState } from "../../types/TweetsTypes";
import { ITweetState, TweetActions, TweetActionTypes } from "../../types/TweetTypes";


const initialState: ITweetState = {
    data: null,
    loadingState: LoadingState.NEVER
}

export const tweetReducer = produce((draft: Draft<ITweetState>, action: TweetActions) => {

    switch (action.type) {

        case TweetActionTypes.FETCH_DATA:
            draft.data = null
            draft.loadingState = LoadingState.LOADING
            break

        case TweetActionTypes.SET_DATA:
            draft.data = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        case TweetActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        default:
            return draft
    }

}, initialState)