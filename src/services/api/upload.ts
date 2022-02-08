import { AxiosResponse } from "axios";
import { axios } from "../../core/axios";
import { IDBUser } from "../../types/UserTypes";



interface IUploadRes {
    url: string
    size: number
    width: number
    height: number
}


export class UploadApi {

    static async uploadAvatar(formData: any): Promise<AxiosResponse<IUploadRes>> {
        return axios.post<IUploadRes>(`/upload/ava`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async uploadImg(formData: any): Promise<AxiosResponse<IUploadRes>> {
        return axios.post<IUploadRes>("/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}
