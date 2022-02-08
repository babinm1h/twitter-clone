

export enum LoadingState {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
    LIKE = "LIKE",
}


export interface IUser {
    fullName: string
    username: string
    avatarUrl: string
    _id: string
}

export interface ITweet {
    text: string
    _id: string
    createdAt: string
    user: IUser
    images?: string[]
    likes: string[]
}

export interface ITweetsState {
    items: ITweet[]
    loadingState: LoadingState
    userTweets: ITweet[]
}




export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    SET_LOADING = "tweets/SET_LOADING",
    ADD_TWEET = "tweets/ADD_TWEET",
    DELETE_TWEET = "tweets/DELETE_TWEET",
    GET_USER_TWEETS = "tweets/GET_USER_TWEETS"
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
export interface IDeleteTweetAction {
    payload: string
    type: TweetsActionTypes.DELETE_TWEET
}
export interface IGetUserTweetsAction {
    payload: ITweet[]
    type: TweetsActionTypes.GET_USER_TWEETS
}


export type TweetsActions =
    ISetTweetsAction | IFetchTweetsAction | ISetTweetsLoadingAction | IAddTweetAction | IDeleteTweetAction | IGetUserTweetsAction