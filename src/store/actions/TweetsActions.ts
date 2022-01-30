import { Dispatch } from "react";
import { TweetsApi } from "../../services/api/tweets";
import { IAddTweetAction, IFetchTweetsAction, ISetTweetsAction, ISetTweetsLoadingAction, ITweet, TweetsActions, TweetsActionTypes } from "../../types/TweetsTypes";


export const setTweets = (payload: ITweet[]): ISetTweetsAction => ({ type: TweetsActionTypes.SET_TWEETS, payload })

export const fetchTweets = (): IFetchTweetsAction => ({ type: TweetsActionTypes.FETCH_TWEETS })

export const addTweet = (tweet: ITweet): IAddTweetAction => ({ type: TweetsActionTypes.ADD_TWEET, payload: tweet })

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

export const addTweetThunk = (text: string) => {
    return async (dispatch: Dispatch<TweetsActions>) => {
        try {
            const tweet = {
                id: Math.random().toString(),
                _id: "61f3b7e11a91ba328c7ec9a7",
                text: text,
                user: {
                    fullName: "m1sha",
                    username: "misutaaacsgod",
                    avatarUrl: "https://img-cdn.hltv.org/playerbodyshot/LdHiQd529230U-hCMYRU4b.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=128%2C19%2C455%2C455&w=200&s=7a25a2d02a8414351f6007ca11d5a7c6"
                }
            }

            const data = await TweetsApi.addTweet(tweet)
            dispatch(addTweet(data.data))

        } catch (e) {
            console.log(e);
        }
    }
}