import React from 'react';
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import { BsUpload } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { ITweet } from '../../../types/TweetsTypes';
import { NavLink, useNavigate } from 'react-router-dom';
import userImg from "../../../img/Home/defaultUser.png"
import { formatDate } from '../../../utils/formatDate';
import { BiDotsHorizontalRounded } from "react-icons/bi"
import "./Tweet.scss"
import TweetModal from './TweetModal/TweetModal';
import { UploadImgList } from '../TweetForm/TweetForm';
import TweetImages from './TweetImages.tsx/TweetImages';
import { useDispatch } from 'react-redux';
import { deleteTweetThunk } from '../../../store/actions/TweetsActions';


interface ITweetProps {
    item: ITweet
}


const Tweet: React.FC<ITweetProps> = ({ item }) => {
    const [popup, setPopup] = React.useState<boolean>(false)
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
                        <BiDotsHorizontalRounded size={32} className="tweet__body__dots"
                            onClick={onOpenPopup} />
                    </div>
                    <NavLink to={`/${item.user.username}/tweet/${item._id}`}>
                        <div className="tweet__body__text">{item.text}</div>
                        {item.images && <TweetImages images={item.images} />}
                    </NavLink>
                    <ul className="tweet__actions">
                        <li className="tweet__actions_item">
                            <FaRegComment className="tweet__actions_icon"
                                size={17} />
                            <span>177</span>
                        </li>
                        <li className="tweet__actions_item">
                            <FiRepeat className="tweet__actions_icon"
                                size={17} />
                            <span>177</span>
                        </li>
                        <li className="tweet__actions_item">
                            <AiOutlineHeart className="tweet__actions_icon"
                                size={17} />
                            <span>77</span>
                        </li>
                        <li className="tweet__actions_item">
                            <BsUpload className="tweet__actions_icon" size={17} />
                        </li>
                    </ul>
                </div>


                {popup && <div ref={popupRef}><TweetModal handleDeleteTweet={handleDeleteTweet} /></div>}
            </li>
        </>
    );
};

export default Tweet;