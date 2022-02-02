import { combineReducers } from "redux";
import { followBarReducer } from "./FollowBarReducer";
import { trendsReducer } from "./TrendsReducer";
import { TweetReducer } from "./TweetReducer";
import { TweetsReducer } from "./TweetsReducer";
import { userReducer } from "./UserReducer";


export const rootReducer = combineReducers({
    tweets: TweetsReducer,
    trends: trendsReducer,
    followBar: followBarReducer,
    tweet: TweetReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>