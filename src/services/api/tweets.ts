import { AxiosResponse } from "axios";
import { axios } from "../../core/axios";
import { ITweet } from "../../types/TweetsTypes";


interface ITweetsResponse<T> {
    status: string
    data: T
}

interface IUploadRes {
    url: string
    size: number
    width: number
    height: number
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

    static async uploadImg(formData: any): Promise<AxiosResponse<IUploadRes>> {
        return axios.post<IUploadRes>("/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async getUserTweets(userId: string): Promise<AxiosResponse<ITweetsResponse<ITweet[]>>> {
        return axios.get<ITweetsResponse<ITweet[]>>(`/tweets/user/${userId}`)
    }

    static async like(tweetId: string) {
        return axios.post(`tweets/like/${tweetId}`)
    }

    static async unlike(tweetId: string) {
        return axios.delete(`tweets/unlike/${tweetId}`,)
    }
}