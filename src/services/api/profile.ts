import { AxiosResponse } from "axios";
import { axios } from "../../core/axios";
import { IDBUser } from "../../types/UserTypes";



interface IProfileResponse {
    status: string
    data: IDBUser
}


export class ProfileApi {

    static async getProfile(userId: string): Promise<AxiosResponse<IProfileResponse>> {
        return axios.get<IProfileResponse>(`/users/${userId}`)
    }

    static async setAbout(payload: string): Promise<AxiosResponse<IProfileResponse>> {
        return axios.patch<IProfileResponse>(`/profile/about`, { about: payload })
    }
}
