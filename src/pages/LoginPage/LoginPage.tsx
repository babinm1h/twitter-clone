import React from 'react';
import "./LoginPage.scss"
import loginBg from "../../img/LoginPage/bg.png"
import { BsTwitter } from "react-icons/bs"
import SignUpModal from '../../components/LoginPage/SignUpForm/SignUpModal';
import LoginModal from '../../components/LoginPage/LoginModal/LoginModal';

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


            {activeSignUp && <SignUpModal closeSignUp={closeSignUp} />}

            {activeLogin && <LoginModal closeLogin={closeLogin} />}

        </div>
    );
};

export default LoginPage;

