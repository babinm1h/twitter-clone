import axios, { AxiosResponse } from "axios";
import { ITweet } from "../../types/TweetsTypes";



export class TweetsApi {

    static async fetchTweets(): Promise<AxiosResponse<ITweet[]>> {
        return axios.get<ITweet[]>("/tweets")
    }

}