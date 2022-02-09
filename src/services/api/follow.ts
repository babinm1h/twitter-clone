import { AxiosResponse } from "axios"
import { axios } from "../../core/axios"

interface IFollowResponse {
    status: string,
    data: string
}


export class FollowApi {

    static async follow(userId: string): Promise<AxiosResponse<IFollowResponse>> {
        return axios.post<IFollowResponse>(`/follow/${userId}`)
    }

    static async unfollow(userId: string): Promise<AxiosResponse<IFollowResponse>> {
        return axios.delete<IFollowResponse>(`/follow/${userId}`)
    }
}