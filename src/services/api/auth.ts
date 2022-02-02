import { AxiosResponse } from "axios"
import { ILoginData } from "../../components/LoginPage/LoginModal/LoginModal";
import { IDBUser } from "../../types/UserTypes";
import { axios } from "../../core/axios"

interface IAuthResponse<T> {
    status: string
    data: T
}

interface ISignData {
    token: string,
    user: IDBUser
}



export class AuthApi {

    static async signIn(loginData: ILoginData): Promise<AxiosResponse<IAuthResponse<ISignData>>> {
        return axios.post<IAuthResponse<ISignData>>("/auth/login", { username: loginData.email, password: loginData.password }, { withCredentials: true })
    }

    static async getMe(): Promise<AxiosResponse<IAuthResponse<IDBUser>>> {
        return axios.get<IAuthResponse<IDBUser>>("/auth/me")
    }

}

// @ts-ignore
window.authApi = AuthApi