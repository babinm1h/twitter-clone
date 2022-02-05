import { TweetsApi } from "../services/api/tweets"


export const uploadImg = async (image: File[]) => {
    const formData = new FormData()
    for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i])
    }

    const res = await TweetsApi.uploadImg(formData)
    return res
}