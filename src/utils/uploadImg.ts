import { TweetsApi } from "../services/api/tweets"




export const uploadImg = async (image: File) => {

    const formData = new FormData()
    formData.append("image", image)
    const { data } = await TweetsApi.uploadImg(formData)
    return data
}