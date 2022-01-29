import axios, { AxiosResponse } from "axios"
import { IUser } from "../../types/TweetsTypes"

export class FollowBarApi {
    static async fetchFollowBarUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>("/users")
    }
}