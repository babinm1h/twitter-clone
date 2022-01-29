import axios, { AxiosResponse } from "axios";
import { ITrendItem } from "../../types/TrendsTypes";


export class TrendsApi {

    static async fetchTrends(): Promise<AxiosResponse<ITrendItem[]>> {
        return axios.get<ITrendItem[]>("/trends")
    }

}