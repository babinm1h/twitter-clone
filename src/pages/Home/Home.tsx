import React from 'react';
import "./Home.scss"
import { BsTwitter, BsFillPencilFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineMail } from "react-icons/ai"
import TweetForm from '../../components/Home/TweetForm/TweetForm';
import Modal from '../../common/Modal/Modal';
import TrendsBar from '../../components/TrendsBar/TrendsBar';
import FollowBar from '../../components/FollowBar/FollowBar';
import { NavLink, Route, Routes } from 'react-router-dom';
import TweetsList from '../../components/Home/TweetsList/TweetsList';
import TweetPage from '../../components/Home/OpenedTweet/OpenedTweet';
import Profile from '../../components/Profile/Profile';
import AuthUser from '../../components/AuthUser/AuthUser';

const Home = () => {
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
                                    <li className="sidebar-menu__item active">
                                        <AiOutlineHome className="sidebar-menu__icon" size={28} />
                                        <span>Главная</span>
                                    </li>
                                    <li className="sidebar-menu__item">
                                        <AiOutlineSearch className="sidebar-menu__icon" size={28} />
                                        <span>Поиск</span>
                                    </li>
                                    <li className="sidebar-menu__item">
                                        <AiOutlineMail className="sidebar-menu__icon" size={28} />
                                        <span>Сообщения</span>
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
                                <Route path="/:username" element={<Profile />} />
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

            {addTweetModal && <Modal title="ffa" onClose={onCloseModal}>
                <TweetForm />
            </Modal>}
        </>
    );
};

export default Home;