import React from 'react';
import "./Home.scss"
import { BsTwitter, BsFillPencilFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
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
import UsersList from '../../components/Home/UsersList/UsersList';
import { FiUsers } from 'react-icons/fi';


const Home = () => {
    const { data } = useTypedSelector(state => state.user)
    const [addTweetModal, setAddTweetModal] = React.useState<boolean>(false)

    const onCloseModal = () => {
        setAddTweetModal(false)
    }
    const onOpenModal = () => {
        setAddTweetModal(true)
    }


    const navItems = [
        { icon: <AiOutlineHome className="sidebar-menu__icon" size={28} />, title: "Главная", path: "/home" },
        { icon: <AiOutlineUser className="sidebar-menu__icon" size={28} />, title: "Профиль", path: `/${data?.username}/${data?._id}` },
        { icon: <FiUsers className="sidebar-menu__icon" size={28} />, title: "Пользователи", path: "/users" },
    ]

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
                                    {navItems.map(i => <li key={i.title}>
                                        <NavLink to={i.path} className="sidebar-menu__item">
                                            {i.icon}<span>{i.title}</span>
                                        </NavLink>
                                    </li>)}
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
                                <Route path="/:username/:id/*" element={<Profile />} />
                                <Route path="/users" element={<UsersList />} />
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