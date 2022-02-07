import { Dispatch } from "react";
import { ImgObj } from "../../components/Home/TweetForm/TweetForm";
import { TweetsApi } from "../../services/api/tweets";
import { IAddTweetAction, IDeleteTweetAction, IFetchTweetsAction, IGetUserTweetsAction, ISetTweetsAction, ISetTweetsLoadingAction, ITweet, LoadingState, TweetsActions, TweetsActionTypes } from "../../types/TweetsTypes";


export const setTweets = (payload: ITweet[]): ISetTweetsAction => ({ type: TweetsActionTypes.SET_TWEETS, payload })

export const fetchTweets = (): IFetchTweetsAction => ({ type: TweetsActionTypes.FETCH_TWEETS })

export const addTweet = (tweet: ITweet): IAddTweetAction => ({ type: TweetsActionTypes.ADD_TWEET, payload: tweet })

export const deleteTweet = (payload: string): IDeleteTweetAction => ({ type: TweetsActionTypes.DELETE_TWEET, payload })

export const getUserTweets = (payload: ITweet[]): IGetUserTweetsAction => ({ type: TweetsActionTypes.GET_USER_TWEETS, payload })


export const setTweetsLoading = (payload: LoadingState): ISetTweetsLoadingAction => ({ type: TweetsActionTypes.SET_LOADING, payload })

// ============================================ THUNKS
export const fetchTweetsThunk = () => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            dispatch(fetchTweets())
            const data = await TweetsApi.fetchTweets()
            dispatch(setTweets(data.data.data))
        } catch (e) {
            dispatch(setTweetsLoading(LoadingState.ERROR))
        }
    }
}

export const addTweetThunk = (payload: { text: string, images: string[] }) => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            dispatch(setTweetsLoading(LoadingState.LOADING))
            const data = await TweetsApi.addTweet(payload)
            dispatch(addTweet(data.data.data))
        } catch (e) {
            dispatch(setTweetsLoading(LoadingState.ERROR))
        }
    }
}

export const deleteTweetThunk = (payload: string) => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            dispatch(deleteTweet(payload))
            await TweetsApi.deleteTweet(payload)
        } catch (e) {
            dispatch(setTweetsLoading(LoadingState.ERROR))
        }
    }
}


export const fetchUserTweets = (userId: string) => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            dispatch(setTweetsLoading(LoadingState.LOADING))
            const res = await TweetsApi.getUserTweets(userId)
            dispatch(getUserTweets(res.data.data))
        } catch (e) {
            dispatch(setTweetsLoading(LoadingState.ERROR))
        }
    }
}