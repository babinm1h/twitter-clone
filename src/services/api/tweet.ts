import axios, { AxiosResponse } from "axios";
import { ITweet } from "../../types/TweetsTypes";


export class TweetApi {

    static async fetchTweetData(tweetId: string): Promise<AxiosResponse<ITweet>> {
        return axios.get<ITweet>(`http://localhost:3001/tweets/?_id=${tweetId}`)
    }
}