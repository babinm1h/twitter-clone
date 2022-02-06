import { Dispatch } from "react";
import { TweetsApi } from "../../services/api/tweets";
import { ITweet, LoadingState } from "../../types/TweetsTypes";
import { IFetchTweetDataAction, ISetTweetDataAction, ISetTweetLoadingAction, TweetActions, TweetActionTypes } from "../../types/TweetTypes";


export const setTweetData = (payload: ITweet): ISetTweetDataAction => ({ type: TweetActionTypes.SET_DATA, payload })

export const fetchTweetData = (): IFetchTweetDataAction => ({ type: TweetActionTypes.FETCH_DATA })

export const setTweetLoading = (payload: LoadingState): ISetTweetLoadingAction => ({ type: TweetActionTypes.SET_LOADING, payload })


// ============================================ THUNKS
export const fetchTweetDataThunk = (tweetId: string) => {
    return async (dispatch: Dispatch<TweetActions>) => {
        try {
            dispatch(fetchTweetData())
            const data = await TweetsApi.fetchSingleTweet(tweetId)
            dispatch(setTweetData(data.data.data))
        } catch (e) {
            dispatch(setTweetLoading(LoadingState.ERROR))
        }
    }
}


