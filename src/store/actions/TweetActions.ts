import { Dispatch } from "react";
import { TweetApi } from "../../services/api/tweet";
import { ITweet } from "../../types/TweetsTypes";
import { IFetchTweetDataAction, ISetTweetDataAction, TweetActions, TweetActionTypes } from "../../types/TweetTypes";


export const setTweetData = (payload: ITweet): ISetTweetDataAction => ({ type: TweetActionTypes.SET_DATA, payload })

export const fetchTweetData = (): IFetchTweetDataAction => ({ type: TweetActionTypes.FETCH_DATA })



// ============================================ THUNKS
export const fetchTweetDataThunk = (tweetId: string) => {
    return async (dispatch: Dispatch<TweetActions>) => {
        try {
            dispatch(fetchTweetData())
            const data = await TweetApi.fetchTweetData(tweetId)
            console.log(data.data);
            dispatch(setTweetData(data.data))
        } catch (e) {
            console.log(e);
        }
    }
}