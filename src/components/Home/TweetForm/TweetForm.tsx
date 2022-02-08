import { useFormik } from 'formik';
import React from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { AiFillCloseCircle } from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import userImg from "../../../img/Home/defaultUser.png"
import * as Yup from "yup"
import "../../../pages/Home/Home.scss"
import { useDispatch } from 'react-redux';
import { addTweetThunk } from '../../../store/actions/TweetsActions';
import { LoadingState } from '../../../types/TweetsTypes';
import UploadImg from './UploadImg/UploadImg';
import "./TweetForm.scss"
import { uploadImg } from '../../../utils/uploadImg';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface ITweetFormProps {
    loadingState?: LoadingState
}

export interface ImgObj {
    blobUrl: string
    file: File
}

const TweetForm: React.FC<ITweetFormProps> = ({ loadingState }) => {
    const [images, setImages] = React.useState<ImgObj[]>([])
    const { data } = useTypedSelector(state => state.user)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            text: "",
            images: images
        },

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setSubmitting(false)
            values.images = images
            const urls = []
            for (let i = 0; i < images.length; i++) {
                const file = images[i].file
                const { url } = await uploadImg(file)
                urls.push(url)
            }

            dispatch(addTweetThunk({ text: values.text, images: urls }))
            resetForm()
            setImages([])
            setSubmitting(true)
        },

        validationSchema: Yup.object().shape({
            text: Yup.string()
                .min(1, "Минимум 1 символ")
                .max(250, "Максимум 250 символов")
                .required("Обязательное поле")
        })
    })

    return (
        <>
            <form className="tweet-form" onSubmit={formik.handleSubmit}>
                <img src={data?.avatarUrl || userImg} alt="user" className="small-avatar" />
                <div className="tweet-form__block">
                    <textarea className="tweet-form__area" name="text"
                        placeholder="Что происходит?"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                    />
                    <div className="form-actions">
                        <ul>
                            <li className="form-actions__item">
                                <UploadImg setImages={setImages} images={images} />
                            </li>
                            <li className="form-actions__item">
                                <BsEmojiSmile className="action-icon" size={18} />
                            </li>
                        </ul>
                        <button className="form-actions__btn btn" type="submit"
                            disabled={!formik.values.text || !!formik.errors.text
                                || loadingState === LoadingState.LOADING || formik.isSubmitting}>
                            Твитнуть
                        </button>
                    </div>
                    <UploadImgList images={images.map(i => i.blobUrl)} setImages={setImages} />
                </div>
            </form>

            {loadingState === LoadingState.ERROR && <div className="tweet-form__error"><BiErrorCircle size={20} /><p>Произошла ошибка</p></div>}
        </>
    );
};

export default TweetForm;





interface IUploadImgListProps {
    images: string[]
    setImages?: React.Dispatch<React.SetStateAction<ImgObj[]>>
}

export const UploadImgList: React.FC<IUploadImgListProps> = ({ images, setImages }) => {

    const onRemoveUpload = (url: string) => {
        setImages!(prev => prev.filter(img => img.blobUrl !== url))
    }

    return (
        <div className="img-list">
            {images && images.map(url => <div key={url} className="img-list__item"
            >
                <AiFillCloseCircle size={22} className="img-list__item_remove"
                    onClick={() => onRemoveUpload(url)} />
                <img src={url} alt="img" />
            </div>)}
        </div>
    )
}