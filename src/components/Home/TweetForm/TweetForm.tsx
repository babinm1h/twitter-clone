import { useFormik } from 'formik';
import React from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiErrorCircle } from "react-icons/bi"
import userImg from "../../../img/Home/defaultUser.png"
import * as Yup from "yup"
import "../../../pages/Home/Home.scss"
import { useDispatch } from 'react-redux';
import { addTweetThunk } from '../../../store/actions/TweetsActions';

const TweetForm = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            text: ""
        },

        onSubmit: (values) => {
            dispatch(addTweetThunk(values.text))
            values.text = ""
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
                <img src={userImg} alt="user" className="small-avatar" />
                <div className="tweet-form__block">
                    <textarea className="tweet-form__area" name="text"
                        placeholder="Что происходит?"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                    />
                    <div className="form-actions">
                        <ul>
                            <li className="form-actions__item">
                                <BsImage className="action-icon" size={18} />
                            </li>
                            <li className="form-actions__item">
                                <BsEmojiSmile className="action-icon" size={18} />
                            </li>
                        </ul>
                        <button className="form-actions__btn btn" type="submit"
                            disabled={!formik.values.text || !!formik.errors.text}>
                            Твитнуть
                        </button>
                    </div>
                </div>
            </form>

            <div className="tweet-form__error"><BiErrorCircle size={20} /> Произошла ошибка</div>
        </>
    );
};

export default TweetForm;