import { useFormik } from 'formik';
import React from 'react';
import Modal from '../../../common/Modal/Modal';
import * as Yup from "yup"


interface ISignUpModalProps {
    closeSignUp: () => void
}

const SignUpModal: React.FC<ISignUpModalProps> = ({ closeSignUp }) => {

    const formikSignUp = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },


        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(2, "Минимальная длина 2 символа")
                .max(45, "Максимальная длина 45 символов")
                .required("Обязательное поле"),
            email: Yup.string().email("Введите правильный e-mail").required("Обязательное поле"),
            password: Yup.string()
                .min(6, "Минимальная длина пароля 6 символов")
                .max(24, "Максимальная длина пароля 24 символа")
                .required("Обязательное поле")
        }),


        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <Modal title="Создайте учетную запись" onClose={closeSignUp}>
            <form onSubmit={formikSignUp.handleSubmit}>
                <input type="text" name="name" autoComplete="on"
                    onChange={formikSignUp.handleChange}
                    placeholder="Ваше имя"
                    value={formikSignUp.values.name}
                    className={formikSignUp.errors.name ? "login-input error" : "login-input"} />
                {formikSignUp.errors.name &&
                    <div className="form-error">
                        {formikSignUp.errors.name}
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
                    disabled={!!formikSignUp.errors.email || !!formikSignUp.errors.password || !!formikSignUp.errors.name}>
                    Зарегистрироваться
                </button>
            </form>
        </Modal>
    );
};

export default SignUpModal;