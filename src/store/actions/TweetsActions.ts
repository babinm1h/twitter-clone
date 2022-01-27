import { ISetTweetsAction, ITweet, TweetsActionTypes } from "../../types/TweetsTypes";


export const setTweets = (payload: ITweet[]): ISetTweetsAction => ({ type: TweetsActionTypes.SET_TWEETS, payload })