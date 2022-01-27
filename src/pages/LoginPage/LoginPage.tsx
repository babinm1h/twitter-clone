import React from 'react';
import "./LoginPage.scss"
import loginBg from "../../img/LoginPage/bg.png"
import { BsTwitter } from "react-icons/bs"
import Modal from '../../common/Modal/Modal';
import * as Yup from "yup"
import { Field, Form, Formik, useFormik } from "formik"

const navItemsArr = [
    { title: "О нас", link: "https://about.twitter.com/en" },
    { title: "Справочный центр", link: "https://help.twitter.com/ru" },
    { title: "Условия предоставления услуг", link: "https://twitter.com/ru/tos" },
    { title: "Политика конфиденциальности", link: "https://about.twitter.com/en" },
    { title: "Политика в отношении файлов cookie", link: "https://about.twitter.com/en" },
    { title: "Специальные возможности", link: "https://about.twitter.com/en" },
    { title: "Информация о рекламе", link: "https://help.twitter.com/ru/resources/accessibility" },
    { title: "Блог", link: "https://about.twitter.com/en" },
    { title: "Статус", link: "https://help.twitter.com/ru/resources/accessibility" },
    { title: "Работа", link: "https://about.twitter.com/en" },
    { title: "Реклама", link: "https://about.twitter.com/en" },
    { title: "Маркетинг", link: "https://twitter.com/ru/tos" },
    { title: "Твиттер для бизнеса", link: "https://about.twitter.com/en" },
    { title: "Разработчикам", link: "https://help.twitter.com/ru/resources/accessibility" },
    { title: "Каталог", link: "https://twitter.com/ru/tos" },
    { title: "Настройки", link: "https://twitter.com/ru/tos" },
]


const LoginPage = () => {
    const [activeSignUp, setActiveSignUp] = React.useState<boolean>(false)
    const [activeLogin, setActivelogin] = React.useState<boolean>(false)

    const openSignUp = () => {
        setActiveSignUp(true)
    }
    const closeSignUp = () => {
        setActiveSignUp(false)
    }
    const openLogin = () => {
        setActivelogin(true)
    }
    const closeLogin = () => {
        setActivelogin(false)
    }


    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: ""
        },


        validationSchema: Yup.object().shape({
            email: Yup.string().email("Введите свой e-mail").required("Введите свой e-mail"),
            password: Yup.string()
                .min(6, "Минимальная длина пароля 6 символов")
                .max(24, "Максимальная длина пароля 24 символа")
                .required("Введите пароль")
        }),


        onSubmit: (values) => {
            console.log(values);

        }
    })

    const formikSignUp = useFormik({
        initialValues: {
            name: "",
            email2: "",
            password2: ""
        },


        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(2, "Минимальная длина 2 символа")
                .max(45, "Максимальная длина 45 символов")
                .required("Обязательное поле"),
            email2: Yup.string().email("Введите правильный e-mail").required("Обязательное поле"),
            password2: Yup.string()
                .min(6, "Минимальная длина пароля 6 символов")
                .max(24, "Максимальная длина пароля 24 символа")
                .required("Обязательное поле")
        }),


        onSubmit: (values) => {
            console.log(values);
        }
    })


    return (
        <div className="login">
            <div className="login-content">
                <div className="login-column login-column-1" style={{ backgroundImage: loginBg }}>
                    <div><BsTwitter size={300} color={"white"} /></div>
                </div>


                <div className="login-column login-column-2">
                    <div><BsTwitter className="login-column-2__icon" /></div>
                    <h1 className="login-column-2__title"><span>В курсе</span>происходящего</h1>
                    <h2 className="login-column-2__subtitle">
                        <span>Присоединяйтесь к Твиттеру прямо</span>сейчас!
                    </h2>
                    <div className="login-column-2__buttons">
                        <button className="loginPage-btn loginbtn" onClick={openLogin}>
                            Войти
                        </button>
                        <button className="loginPage-btn blue" onClick={openSignUp}>
                            Зарегистрироваться
                        </button>
                        <div className="login-column-2__agreement">
                            Регистрируясь, вы соглашаетесь с <a href="https://twitter.com/ru/privacy" target="_blank" rel="noreferrer">Условиями предоставления услуг</a> и <a href="https://twitter.com/ru/privacy" target="_blank" rel="noreferrer">Политикой конфиденциальности</a>, а также сПолитикой использования файлов cookie.
                        </div>
                    </div>
                </div>
            </div>


            <div className="login-footer">
                <nav className="login-footer__nav footer-nav">
                    <ul>
                        {navItemsArr.map(i => {
                            return <li className="footer-nav__item" key={i.title}>
                                <a href={i.link} rel="noreferrer" target="_blank">
                                    {i.title}
                                </a>
                            </li>
                        })}
                    </ul>
                </nav>
            </div>


            {activeSignUp && <Modal title="Создайте учетную запись" onClose={closeSignUp}>
                <form onSubmit={formikSignUp.handleSubmit}>
                    <input type="text" name="name"
                        onChange={formikSignUp.handleChange}
                        placeholder="Ваше имя"
                        value={formikSignUp.values.name}
                        className={formikSignUp.errors.name ? "login-input error" : "login-input"} />
                    {formikSignUp.errors.name &&
                        <div className="form-error">
                            {formikSignUp.errors.name}
                        </div>}

                    <input type="email" name="email2"
                        onChange={formikSignUp.handleChange}
                        placeholder="Ваш e-mail"
                        value={formikSignUp.values.email2}
                        className={formikSignUp.errors.email2 ? "login-input error" : "login-input"} />
                    {formikSignUp.errors.email2 &&
                        <div className="form-error">
                            {formikSignUp.errors.email2}
                        </div>}

                    <input type="password" name="password2"
                        onChange={formikSignUp.handleChange}
                        placeholder="Пароль"
                        value={formikSignUp.values.password2}
                        className={formikSignUp.errors.password2 ? "login-input error"
                            : "login-input"} />
                    {formikSignUp.errors.password2 &&
                        <div className="form-error">
                            {formikSignUp.errors.password2}
                        </div>}

                    <button type="submit" className="form-button"
                        disabled={!!formikSignUp.errors.email2 || !!formikSignUp.errors.password2 || !!formikSignUp.errors.name}>
                        Зарегистрироваться
                    </button>
                </form>
            </Modal>}



            {activeLogin && <Modal title="Вход в Твиттер" onClose={closeLogin}>
                <form onSubmit={formikLogin.handleSubmit}>
                    <input type="email"
                        name="email" onChange={formikLogin.handleChange}
                        placeholder="E-mail"
                        value={formikLogin.values.email}
                        className={formikLogin.errors.email ? "login-input error" : "login-input"} />
                    {formikLogin.errors.email &&
                        <div className="form-error">
                            {formikLogin.errors.email}
                        </div>}

                    <input type="password"
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
                </form>
            </Modal>}

        </div>
    );
};

export default LoginPage;

