import React from 'react';
import "./Home.scss"
import { BsTwitter, BsImage, BsUpload, BsFillPencilFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart, AiOutlineMail } from "react-icons/ai"
import userImg from "../../img/Home/defaultUser.png"
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import Tweet from '../../components/Home/Tweet/Tweet';
import FollowItem from '../../components/Home/FollowItem/FollowItem';
import TweetForm from '../../components/Home/TweetForm/TweetForm';
import Modal from '../../common/Modal/Modal';
import { useDispatch } from 'react-redux';
import { fetchTweetsThunk } from '../../store/actions/TweetsActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../../common/Loader/Loader';
import { LoadingState } from '../../types/TweetsTypes';
import TrendsBar from '../../components/Home/TrendsBar/TrendsBar';
import FollowBar from '../../components/FollowBar/FollowBar';
import { NavLink, Route, Routes } from 'react-router-dom';
import TweetsList from '../../components/Home/TweetsList/TweetsList';
import TweetPage from '../../components/Home/TweetPage/TweetPage';
import Profile from '../../components/Profile/Profile';


const Home = () => {
    const dispatch=useDispatch()


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