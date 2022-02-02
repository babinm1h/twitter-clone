import { AxiosResponse } from "axios"
import { axios } from "../../core/axios"
import { IDBUser } from "../../types/UserTypes"

interface IFollowBarResponse {
    status: string,
    data: IDBUser[]
}


export class FollowBarApi {
    static async fetchFollowBarUsers(): Promise<AxiosResponse<IFollowBarResponse>> {
        return axios.get<IFollowBarResponse>("/users")
    }
}