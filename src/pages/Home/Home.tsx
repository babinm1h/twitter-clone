import React from 'react';
import "./Home.scss"
import { BsTwitter, BsImage, BsUpload, BsFillPencilFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai"
import userImg from "../../img/Home/defaultUser.png"
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import Tweet from '../../components/Home/Tweet/Tweet';
import FollowItem from '../../components/Home/FollowItem/FollowItem';
import TweetForm from '../../components/Home/TweetForm/TweetForm';
import Modal from '../../common/Modal/Modal';

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
                                        <BsTwitter size={30} className="home__logo" />
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
                                        <AiOutlineSearch className="sidebar-menu__icon" size={28} />
                                        <span>Поиск</span>
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
                            <div className="home__main_header">
                                <h2>Главная</h2>
                            </div>

                            <TweetForm />

                            <div className="tweets">
                                <ul className="tweets-list">
                                    <Tweet />
                                </ul>
                            </div>
                        </div>
                    </div>




                    <div className="home__right">
                        <div className="home__right-container">
                            <ul className="trends">
                                <h3>Тренды для вас</h3>
                                <li className="trends__item">
                                    <p className="trends__item_title">Коронавирус</p>
                                    <p className="trends__item_tweets">777,999 Твитов</p>
                                </li>
                                <li className="trends__item">
                                    <p className="trends__item_title">Коронавирус</p>
                                    <p className="trends__item_tweets">999 Твитов</p>
                                </li>
                                <li className="trends__item">
                                    <p className="trends__item_title">Коронавирус</p>
                                    <p className="trends__item_tweets">777 Твитов</p>
                                </li>
                                <li className="trends__item">
                                    <p className="trends__item_title">Коронавирус</p>
                                    <p className="trends__item_tweets">777 Твитов</p>
                                </li>
                                <li className="trends__item">
                                    <p className="trends__item_title">Коронавирус</p>
                                    <p className="trends__item_tweets">777 Твитов</p>
                                </li>
                            </ul>

                            <ul className="follow">
                                <h3>Кого читать</h3>
                                <FollowItem />
                                <FollowItem />
                            </ul>
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