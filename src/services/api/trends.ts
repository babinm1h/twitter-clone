import { AxiosResponse } from "axios";
import { ITrendItem } from "../../types/TrendsTypes";
import { axios } from "../../core/axios"

export class TrendsApi {

    static async fetchTrends(): Promise<AxiosResponse<ITrendItem[]>> {
        return axios.get<ITrendItem[]>("/")
    }

}