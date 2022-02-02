import { AxiosResponse } from "axios";
import { axios } from "../../core/axios";
import { ITweet } from "../../types/TweetsTypes";


interface ITweetsResponse<T> {
    status: string
    data: T
}


export class TweetsApi {

    static async fetchTweets(): Promise<AxiosResponse<ITweetsResponse<ITweet[]>>> {
        return axios.get<ITweetsResponse<ITweet[]>>("/tweets")
    }

    static async fetchSingleTweet(tweetId: string): Promise<AxiosResponse<ITweetsResponse<ITweet>>> {
        return axios.get<ITweetsResponse<ITweet>>(`/tweets/${tweetId}`)
    }

    static async addTweet(text: string): Promise<AxiosResponse<ITweetsResponse<ITweet>>> {
        return axios.post<ITweetsResponse<ITweet>>("/tweets", { text })
    }
}