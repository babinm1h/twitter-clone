import { ITweet, LoadingState } from "./TweetsTypes";


export interface ITweetState {
    data: ITweet | null
    loadingState: LoadingState
}


export enum TweetActionTypes {
    SET_DATA = "tweet/SET_DATA",
    FETCH_DATA = "tweet/FETCH_DATA",
    SET_LOADING = "tweet/SET_LOADING",
}

export interface ISetTweetDataAction {
    type: TweetActionTypes.SET_DATA
    payload: ITweet
}
export interface IFetchTweetDataAction {
    type: TweetActionTypes.FETCH_DATA
}
export interface ISetTweetLoadingAction {
    type: TweetActionTypes.SET_LOADING
    payload: LoadingState
}


export type TweetActions = IFetchTweetDataAction | ISetTweetDataAction | ISetTweetLoadingAction
