import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../../../common/Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchTweetDataThunk } from '../../../store/actions/TweetActions';
import { LoadingState } from '../../../types/TweetsTypes';
import BackButton from '../../BackButton/BackButton';
import "./OpenedTweet.scss"
import userImg from "../../../img/Home/defaultUser.png"
import { formatDate } from '../../../utils/formatDate';

const TweetPage = () => {
    const dispatch = useDispatch()
    const { data, loadingState } = useTypedSelector(state => state.tweet)

    const { username, id } = useParams<string>()

    React.useEffect(() => {
        if (id) {
            dispatch(fetchTweetDataThunk(id))
        }
    }, [id, dispatch])


    if (!data) return null



    return (
        <>
            <div className="home__main_header">
                <BackButton /> <h2>Твит</h2>
            </div>
            <div className="opened-tweet">
                <div className="opened-tweet__info">
                    <img src={data.user.avatarUrl || userImg} alt="user" className="small-avatar" />
                    <div className="opened-tweet__author">
                        <div className="opened-tweet__fullname">{data.user.fullName}</div>
                        <div className="opened-tweet__nick">@{data.user.username}</div>
                    </div>
                </div>
                <div className="opened-tweet__text">
                    {data.text}
                </div>

                <div className="opened-tweet__date">Создан: {formatDate(new Date(data.createdAt))}</div>

                <ul className="opened-tweet__stats stats-opened">
                    <li className="stats-opened__item">
                        <span>777</span> Retweets
                    </li>
                    <li className="stats-opened__item">
                        <span>9999</span> Likes
                    </li>
                </ul>


                <ul className="opened-tweet__actions actions-opened">
                    <li className="actions-opened__item">
                        <FaRegComment className="actions-opened__icon"
                            size={24} />
                    </li>
                    <li className="actions-opened__item">
                        <FiRepeat className="actions-opened__icon"
                            size={24} />
                    </li>
                    <li className="actions-opened__item">
                        <AiOutlineHeart className="actions-opened__icon"
                            size={24} />
                    </li>
                    <li className="actions-opened__item">
                        <BsUpload className="actions-opened__icon" size={24} />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default TweetPage;