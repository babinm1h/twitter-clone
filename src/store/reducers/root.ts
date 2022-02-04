import { combineReducers } from "redux";
import { followBarReducer } from "./FollowBarReducer";
import { signUpReducer } from "./SignUpReducer";
import { trendsReducer } from "./TrendsReducer";
import { tweetReducer } from "./TweetReducer";
import { tweetsReducer } from "./TweetsReducer";
import { userReducer } from "./UserReducer";


export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    trends: trendsReducer,
    followBar: followBarReducer,
    tweet: tweetReducer,
    user: userReducer,
    signUp: signUpReducer
})

export type RootState = ReturnType<typeof rootReducer>