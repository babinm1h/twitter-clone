import { Dispatch } from "react";
import { TweetsApi } from "../../services/api/tweets";
import { IFetchTweetsAction, ISetTweetsAction, ISetTweetsLoadingAction, ITweet, TweetsActions, TweetsActionTypes } from "../../types/TweetsTypes";


export const setTweets = (payload: ITweet[]): ISetTweetsAction => ({ type: TweetsActionTypes.SET_TWEETS, payload })

export const fetchTweets = (): IFetchTweetsAction => ({ type: TweetsActionTypes.FETCH_TWEETS })



// ============================================ THUNKS
export const fetchTweetsThunk = () => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            dispatch(fetchTweets())
            const data = await TweetsApi.fetchTweets()
            dispatch(setTweets(data.data))
        } catch (e) {
            console.log(e);
        }
    }
}