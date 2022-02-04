import { useFormik } from 'formik';
import React from 'react';
import Modal from '../../../common/Modal/Modal';
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { BiErrorCircle } from 'react-icons/bi';
import { LoadingState } from '../../../types/TweetsTypes';
import { signUp } from '../../../store/actions/SignUpActions';


interface ISignUpModalProps {
    closeSignUp: () => void
}

export interface ISignUpForm {
    fullName: string
    username: string
    email: string
    password: string
}

const SignUpModal: React.FC<ISignUpModalProps> = ({ closeSignUp }) => {
    const dispatch = useDispatch()
    const { data, loadingState } = useTypedSelector(state => state.signUp)

    const formikSignUp = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            password: ""
        },


        validationSchema: Yup.object().shape({
            fullName: Yup.string()
                .min(2, "Минимальная длина 2 символа")
                .max(35, "Максимальная длина 35 символов")
                .required("Обязательное поле"),
            username: Yup.string()
                .min(2, "Минимальная длина 2 символа")
                .max(35, "Максимальная длина 35 символов")
                .required("Обязательное поле"),
            email: Yup.string().email("Введите правильный e-mail").required("Обязательное поле"),
            password: Yup.string()
                .min(6, "Минимальная длина пароля 6 символов")
                .max(35, "Максимальная длина пароля 35 символа")
                .required("Обязательное поле")
        }),


        onSubmit: (values: ISignUpForm) => {
            dispatch(signUp(values))
            closeSignUp()
        }
    })

    return (
        <Modal title="Создайте учетную запись" onClose={closeSignUp}>
            <form onSubmit={formikSignUp.handleSubmit}>
                <input type="text" name="fullName" autoComplete="on"
                    onChange={formikSignUp.handleChange}
                    placeholder="Ваше имя"
                    value={formikSignUp.values.fullName}
                    className={formikSignUp.errors.fullName ? "login-input error" : "login-input"} />
                {formikSignUp.errors.fullName &&
                    <div className="form-error">
                        {formikSignUp.errors.fullName}
                    </div>}

                <input type="text" name="username" autoComplete="on"
                    onChange={formikSignUp.handleChange}
                    placeholder="Имя пользователя"
                    value={formikSignUp.values.username}
                    className={formikSignUp.errors.username ? "login-input error" : "login-input"} />
                {formikSignUp.errors.username &&
                    <div className="form-error">
                        {formikSignUp.errors.username}
                    </div>}

                <input type="email" name="email" autoComplete="on"
                    onChange={formikSignUp.handleChange}
                    placeholder="Ваш e-mail"
                    value={formikSignUp.values.email}
                    className={formikSignUp.errors.email ? "login-input error" : "login-input"} />
                {formikSignUp.errors.email &&
                    <div className="form-error">
                        {formikSignUp.errors.email}
                    </div>}

                <input type="password" name="password" autoComplete="on"
                    onChange={formikSignUp.handleChange}
                    placeholder="Пароль"
                    value={formikSignUp.values.password}
                    className={formikSignUp.errors.password ? "login-input error"
                        : "login-input"} />
                {formikSignUp.errors.password &&
                    <div className="form-error">
                        {formikSignUp.errors.password}
                    </div>}

                <button type="submit" className="form-button"
                    disabled={!!formikSignUp.errors.email || !!formikSignUp.errors.password || !!formikSignUp.errors.fullName || !!formikSignUp.errors.username || loadingState === LoadingState.LOADING}>
                    Зарегистрироваться
                </button>
                {loadingState === LoadingState.ERROR && <div className="error-note">
                    <BiErrorCircle size={18} /><span>Ошибка при регистрации</span>
                </div>}
            </form>
        </Modal>
    );
};

export default SignUpModal;