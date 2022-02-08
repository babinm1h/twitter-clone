import { UploadApi } from "../services/api/upload"




export const uploadImg = async (image: File) => {
    const formData = new FormData()
    formData.append("image", image)
    const { data } = await UploadApi.uploadImg(formData)
    return data
}


export const uploadAvatar = async (image: File) => {
    const formData = new FormData()
    formData.append("avatar", image)
    const { data } = await UploadApi.uploadAvatar(formData)
    return data
}

