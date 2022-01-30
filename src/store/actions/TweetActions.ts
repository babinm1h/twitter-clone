import { Dispatch } from "react";
import { TweetsApi } from "../../services/api/tweets";
import { ITweet } from "../../types/TweetsTypes";
import { IFetchTweetDataAction, ISetTweetDataAction, TweetActions, TweetActionTypes } from "../../types/TweetTypes";


export const setTweetData = (payload: ITweet): ISetTweetDataAction => ({ type: TweetActionTypes.SET_DATA, payload })

export const fetchTweetData = (): IFetchTweetDataAction => ({ type: TweetActionTypes.FETCH_DATA })



// ============================================ THUNKS
export const fetchTweetDataThunk = (tweetId: string) => {
    return async (dispatch: Dispatch<TweetActions>) => {
        try {
            dispatch(fetchTweetData())
            const data = await TweetsApi.fetchSingleTweet(tweetId)
            dispatch(setTweetData(data.data[0]))
        } catch (e) {
            console.log(e);
        }
    }
}