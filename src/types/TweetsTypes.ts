
export enum LoadingState {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER"
}


export interface IUser {
    fullName: string
    username: string
    avatarUrl: string
}

export interface ITweet {
    text: string
    _id: string
    user: IUser
}

export interface ITweetsState {
    items: ITweet[]
    loadingState: LoadingState
}




export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    SET_LOADING = "tweets/SET_LOADING",
    ADD_TWEET = "tweets/ADD_TWEET",
}


export interface ISetTweetsAction {
    type: TweetsActionTypes.SET_TWEETS
    payload: ITweet[]
}
export interface IFetchTweetsAction {
    type: TweetsActionTypes.FETCH_TWEETS
}
export interface ISetTweetsLoadingAction {
    type: TweetsActionTypes.SET_LOADING
    payload: LoadingState
}
export interface IAddTweetAction {
    payload: ITweet
    type: TweetsActionTypes.ADD_TWEET
}



export type TweetsActions =
    ISetTweetsAction | IFetchTweetsAction | ISetTweetsLoadingAction | IAddTweetAction