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

    static async addTweet(payload: { text: string, images: string[] }): Promise<AxiosResponse<ITweetsResponse<ITweet>>> {
        return axios.post<ITweetsResponse<ITweet>>("/tweets", { text: payload.text, images: payload.images })
    }

    static async deleteTweet(tweetId: string) {
        return axios.delete(`/tweets/${tweetId}`)
    }


    static async update(tweetId: string, payload: string) {
        return axios.patch(`http://localhost:8888/tweets/${tweetId}`, { text: payload })
    }

    static async getUserTweets(userId: string): Promise<AxiosResponse<ITweetsResponse<ITweet[]>>> {
        return axios.get<ITweetsResponse<ITweet[]>>(`/tweets/user/${userId}`)
    }

    static async like(tweetId: string) {
        return axios.post(`http://localhost:8888/tweets/like/${tweetId}`)
    }

    static async unlike(tweetId: string) {
        return axios.delete(`http://localhost:8888/tweets/unlike/${tweetId}`,)
    }
}