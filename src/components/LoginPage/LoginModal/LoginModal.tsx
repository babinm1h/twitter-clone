import { useFormik } from 'formik';
import React from 'react';
import Modal from '../../../common/Modal/Modal';
import { AuthApi } from '../../../services/api/auth';
import * as Yup from "yup"
import { BiErrorAlt, BiErrorCircle } from "react-icons/bi"
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions/UserActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { LoadingState } from '../../../types/TweetsTypes';


export interface ILoginData {
    email: string
    password: string
}

interface ILoginModalProps {
    closeLogin: () => void
}

const LoginModal: React.FC<ILoginModalProps> = ({ closeLogin }) => {
    const dispatch = useDispatch()
    const { loadingState, data } = useTypedSelector(state => state.user)


    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: ""
        },


        validationSchema: Yup.object().shape({
            email: Yup.string().email("Введите свой e-mail").required("Введите свой e-mail"),
            password: Yup.string()
                .min(6, "Минимальная длина пароля 6 символов")
                .max(44, "Максимальная длина пароля 44 символа")
                .required("Введите пароль")
        }),


        onSubmit: async (values: ILoginData) => {
            try {
                dispatch(login(values))
                closeLogin()
            } catch (err) {
                console.log(err);
            }
        }
    })

    return (
        <Modal title="Вход в Твиттер" onClose={closeLogin}>
            <form onSubmit={formikLogin.handleSubmit}>
                <input type="email" autoComplete="on"
                    name="email" onChange={formikLogin.handleChange}
                    placeholder="E-mail"
                    value={formikLogin.values.email}
                    className={formikLogin.errors.email ? "login-input error" : "login-input"} />
                {formikLogin.errors.email &&
                    <div className="form-error">
                        {formikLogin.errors.email}
                    </div>}

                <input type="password" autoComplete="on"
                    name="password" onChange={formikLogin.handleChange}
                    placeholder="Пароль"
                    value={formikLogin.values.password}
                    className={formikLogin.errors.password ? "login-input error" : "login-input"} />
                {formikLogin.errors.password &&
                    <div className="form-error">
                        {formikLogin.errors.password}
                    </div>}

                <button type="submit" className="form-button"
                    disabled={!!formikLogin.errors.email || !!formikLogin.errors.password}>
                    Войти
                </button>

                {loadingState === LoadingState.ERROR && <div className="error-note">
                    <BiErrorCircle size={18} /><span>Неправильный логин или пароль</span>
                </div>}
            </form>
        </Modal>
    );
};

export default LoginModal;