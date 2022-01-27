
export enum LoadingState {
    LOADED = "LOADED",
    ERROR = "ERROR",
    NEVER = "NEVER"
}


export interface ITweet {
    text: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

export interface ITweetsState {
    items: ITweet[]
    loadingState: LoadingState
}




export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS"
}

export interface ISetTweetsAction {
    type: TweetsActionTypes.SET_TWEETS
    payload: ITweet[]
}





export type TweetsActions = ISetTweetsAction