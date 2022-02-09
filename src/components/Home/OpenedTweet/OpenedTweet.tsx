import React from 'react';
import { BsUpload } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchTweetDataThunk } from '../../../store/actions/TweetActions';
import BackButton from '../../BackButton/BackButton';
import "./OpenedTweet.scss"
import userImg from "../../../img/Home/defaultUser.png"
import { formatDate } from '../../../utils/formatDate';
import { BiDotsHorizontalRounded } from "react-icons/bi"
import TweetModal from '../Tweet/TweetModal/TweetModal';
import { deleteTweetThunk } from '../../../store/actions/TweetsActions';
import TweetImages from '../Tweet/TweetImages.tsx/TweetImages';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { unlikeTweetThunk, likeTweetThunk } from '../../../store/actions/UserActions';
import { LoadingState } from '../../../types/TweetsTypes';
import Linkify from 'linkify-react';



const TweetPage = () => {
    const { data, loadingState } = useTypedSelector(state => state.tweet)
    const { data: authData } = useTypedSelector(state => state.user)

    const [popup, setPopup] = React.useState<boolean>(false)
    const [likesLength, setLikesLength] = React.useState(data?.likes.length)
    const popupRef = React.useRef<HTMLDivElement | any>()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { username, id } = useParams<string>()


    const isOwner = authData === data?.user._id

    const handleClick = (e: Event) => {
        if (popupRef.current) {
            if (!popupRef.current.contains(e.target)) {
                setPopup(false)
            }
        }
    }

    const handleDeleteTweet = () => {
        if (window.confirm("Удалить твит?")) {
            if (data) {
                dispatch(deleteTweetThunk(data._id))
                navigate("/home")
            }
        }
    }

    const onOpenPopup = () => {
        setPopup(true)
    }

    React.useEffect(() => {
        if (id) {
            dispatch(fetchTweetDataThunk(id))
        }
    }, [id, dispatch])

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);


    const handleLike = () => {
        if (data && id) {
            if (authData?.likes?.includes(id)) {
                setLikesLength(likesLength! - 1)
                dispatch(unlikeTweetThunk(id))
            } else {
                setLikesLength(likesLength! + 1)
                dispatch(likeTweetThunk(id))
            }
        }
    }


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
                    {isOwner && <BiDotsHorizontalRounded size={32} className="opened-tweet__dots"
                        onClick={onOpenPopup} />}
                    {popup && <div ref={popupRef}>
                        <TweetModal handleDeleteTweet={handleDeleteTweet} />
                    </div>}
                </div>
                <div className="opened-tweet__text">
                    <Linkify>{data.text}</Linkify>
                </div>

                {data.images && <TweetImages images={data.images} />}

                <div className="opened-tweet__date">Создан: {formatDate(new Date(data.createdAt))}</div>

                <ul className="opened-tweet__stats stats-opened">
                    <li className="stats-opened__item">
                        <span>777</span> Retweets
                    </li>
                    <li className="stats-opened__item">
                        <span>{data.likes.length}</span> Likes
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
                        {!authData?.likes?.includes(data._id)
                            ? <button onClick={handleLike}
                                disabled={loadingState === LoadingState.LIKE}>
                                <FcLikePlaceholder className="actions-opened__icon"
                                    size={24} />
                            </button>
                            : <button onClick={handleLike}
                                disabled={loadingState === LoadingState.LIKE}>
                                <FcLike className="actions-opened__icon"
                                    size={24} />
                            </button>}
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