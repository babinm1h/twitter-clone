import React from 'react';
import "./Home.scss"
import { BsTwitter, BsFillPencilFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import TweetForm from '../../components/Home/TweetForm/TweetForm';
import Modal from '../../common/Modal/Modal';
import TrendsBar from '../../components/TrendsBar/TrendsBar';
import FollowBar from '../../components/FollowBar/FollowBar';
import { NavLink, Route, Routes } from 'react-router-dom';
import TweetsList from '../../components/Home/TweetsList/TweetsList';
import TweetPage from '../../components/Home/OpenedTweet/OpenedTweet';
import Profile from '../../components/Profile/Profile';
import AuthUser from '../../components/AuthUser/AuthUser';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Home = () => {
    const { data } = useTypedSelector(state => state.user)
    const [addTweetModal, setAddTweetModal] = React.useState<boolean>(false)

    const onCloseModal = () => {
        setAddTweetModal(false)
    }
    const onOpenModal = () => {
        setAddTweetModal(true)
    }

    return (
        <>
            <section className="home">
                <div className="home__row">
                    <div className="home__left">
                        <div className="home__left-sidebar">
                            <nav className="sidebar-menu">
                                <ul>
                                    <li>
                                        <NavLink to="/home">
                                            <BsTwitter size={30} className="home__logo" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/home" className="sidebar-menu__item">
                                            <AiOutlineHome className="sidebar-menu__icon" size={28} />
                                            <span>Главная</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/${data?.username}/${data?._id}`} className="sidebar-menu__item">
                                            <AiOutlineUser className="sidebar-menu__icon" size={28} />
                                            <span>Профиль</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to=""
                                            className="sidebar-menu__item sidebar-menu__item_disabled">
                                            <AiOutlineSearch className="sidebar-menu__icon" size={28} />
                                            <span>Поиск</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to=""
                                            className="sidebar-menu__item sidebar-menu__item_disabled">
                                            <AiOutlineMail className="sidebar-menu__icon sidebar-menu__icon_disabled" size={28} />
                                            <span>Сообщения</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <button className="tweet-button" onClick={onOpenModal}>
                                <span>Твитнуть</span>
                                <BsFillPencilFill className="tweet-button__icon" size={18} />
                            </button>
                        </div>

                        <AuthUser />
                    </div>


                    <div className="home__main">
                        <div className="home__main_content">
                            <Routes>
                                <Route path="/home" element={<TweetsList />} />
                                <Route path="/:username/tweet/:id" element={<TweetPage />} />
                                <Route path="/:username/:id" element={<Profile />} />
                            </Routes>
                        </div>
                    </div>


                    <div className="home__right">
                        <div className="home__right-container">
                            <TrendsBar />
                            <FollowBar />
                        </div>
                    </div>
                </div>
            </section>

            {addTweetModal && <Modal title="Добавить твит" onClose={onCloseModal}>
                <TweetForm />
            </Modal>}
        </>
    );
};

export default Home;