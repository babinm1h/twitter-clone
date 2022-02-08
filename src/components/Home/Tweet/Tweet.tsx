import React, { ChangeEvent } from 'react';
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import { BsUpload } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { ITweet, LoadingState } from '../../../types/TweetsTypes';
import { NavLink } from 'react-router-dom';
import userImg from "../../../img/Home/defaultUser.png"
import { formatDate } from '../../../utils/formatDate';
import { BiDotsHorizontalRounded } from "react-icons/bi"
import "./Tweet.scss"
import TweetModal from './TweetModal/TweetModal';
import TweetImages from './TweetImages.tsx/TweetImages';
import { useDispatch } from 'react-redux';
import { deleteTweetThunk, fetchTweetsThunk } from '../../../store/actions/TweetsActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { likeTweetThunk, unlikeTweetThunk } from '../../../store/actions/UserActions';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { TweetsApi } from '../../../services/api/tweets';


interface ITweetProps {
    item: ITweet
}


const Tweet: React.FC<ITweetProps> = ({ item }) => {
    const { data, loadingState } = useTypedSelector(state => state.user)
    const isOnwer = data?._id === item.user._id

    const [likesLength, setLikesLength] = React.useState(item.likes.length)
    const [popup, setPopup] = React.useState<boolean>(false)

    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [text, setText] = React.useState<string>(item.text)

    const popupRef = React.useRef<HTMLDivElement | any>()
    const dispatch = useDispatch()

    const handleClick = (e: Event) => {
        if (popupRef.current) {
            if (!popupRef.current.contains(e.target)) {
                setPopup(false)
            }
        }
    }

    const onOpenPopup = () => {
        setPopup(true)
    }

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);


    const handleDeleteTweet = () => {
        if (window.confirm("Удалить твит?")) {
            dispatch(deleteTweetThunk(item._id))
        }
    }

    const handleLike = () => {
        if (data?.likes?.includes(item._id)) {
            setLikesLength(likesLength - 1)
            dispatch(unlikeTweetThunk(item._id))
        } else {
            setLikesLength(likesLength + 1)
            dispatch(likeTweetThunk(item._id))
        }
    }

    const handleEdit = () => {
        setEditMode(true)
    }
    const handleChangeTweet = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleSaveChanges = async () => {
        setEditMode(false)
        await TweetsApi.update(item._id, text)
    }


    return (
        <>
            <li className="tweet">
                <NavLink to={`/${item.user.username}/${item.user._id}`}>
                    <img src={item.user.avatarUrl || userImg} alt="user" className="small-avatar" />
                </NavLink>
                <div className="tweet__body">
                    <div className="tweet__body__header">
                        <div className="tweet__body__info">
                            <NavLink to={`/${item.user.username}/${item.user._id}`}>
                                <span className="tweet__body__name">{item.user.fullName}</span>
                                <span className="tweet__body__nick">@{item.user.username}</span>
                            </NavLink>
                            <span className="tweet__body__date">
                                · {formatDate(new Date(item.createdAt))}
                            </span>
                        </div>
                        {isOnwer && <BiDotsHorizontalRounded size={32} className="tweet__body__dots"
                            onClick={onOpenPopup} />}
                    </div>

                    {editMode
                        ? <div>
                            <input type="text" className="tweet__body__edit-input"
                                onChange={(e) => handleChangeTweet(e)} value={text} />
                            <button onClick={handleSaveChanges} className="btn tweet__body__edit-btn">
                                Сохранить
                            </button>
                        </div>
                        : <NavLink to={`/${item.user.username}/tweet/${item._id}`}>
                            <p className="tweet__body__text">{text}</p>
                            {item.images && <TweetImages images={item.images} />}
                        </NavLink>}
                    <ul className="tweet__actions">
                        <li className="tweet__actions_item">
                            <FaRegComment className="tweet__actions_icon"
                                size={17} />
                            <span>77</span>
                        </li>
                        <li className="tweet__actions_item">
                            <FiRepeat className="tweet__actions_icon"
                                size={17} />
                            <span>1499</span>
                        </li>
                        <li className="tweet__actions_item">
                            {!data?.likes?.includes(item._id)
                                ? <button onClick={handleLike}
                                    disabled={loadingState === LoadingState.LIKE}>
                                    <FcLikePlaceholder className="tweet__actions_icon"
                                        size={17} />
                                </button>
                                : <button onClick={handleLike}
                                    disabled={loadingState === LoadingState.LIKE}>
                                    <FcLike className="tweet__actions_icon"
                                        size={17} />
                                </button>}
                            <span>{likesLength}</span>
                        </li>
                        <li className="tweet__actions_item">
                            <BsUpload className="tweet__actions_icon" size={17} />
                        </li>
                    </ul>
                </div>


                {popup && <div ref={popupRef}>
                    <TweetModal handleDeleteTweet={handleDeleteTweet} handleEdit={handleEdit} />
                </div>}
            </li>
        </>
    );
};

export default Tweet;