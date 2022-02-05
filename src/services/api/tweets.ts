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

    static async uploadImg(formData: any): Promise<any> {
        return axios.post<any>("/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}