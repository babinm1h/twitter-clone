import axios, { AxiosResponse } from "axios";
import { ITweet } from "../../types/TweetsTypes";


interface ISingleTweetResponse {
    0: ITweet
}

export class TweetsApi {

    static async fetchTweets(): Promise<AxiosResponse<ITweet[]>> {
        return axios.get<ITweet[]>("/tweets")
    }

    static async fetchSingleTweet(tweetId: string): Promise<AxiosResponse<ISingleTweetResponse>> {
        return axios.get<ISingleTweetResponse>(`http://localhost:3001/tweets/?_id=${tweetId}`)
    }

    static async addTweet(tweet: ITweet): Promise<AxiosResponse<ITweet>> {
        return axios.post<ITweet>("/tweets", tweet)
    }
}