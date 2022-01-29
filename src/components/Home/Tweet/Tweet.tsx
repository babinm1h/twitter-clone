import React from 'react';
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import { BsTwitter, BsImage, BsUpload } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai"
import { ITweet } from '../../../types/TweetsTypes';
import { NavLink } from 'react-router-dom';

interface ITweetProps {
    item: ITweet
}

const Tweet: React.FC<ITweetProps> = ({ item }) => {
    return (
        <NavLink to={`/${item.user.username}/tweet/${item._id}`}>
            <li className="tweet">
                <NavLink to={`/${item.user.username}`}>
                    <img src={item.user.avatarUrl} alt="user" className="small-avatar" />
                </NavLink>
                <div className="tweet__body">
                    <div className="tweet__body__info">
                        <NavLink to={`/${item.user.username}`}>
                            <span className="tweet__body__name">{item.user.fullName}</span>
                            <span className="tweet__body__nick">@{item.user.username}</span>
                        </NavLink>
                        <span className="tweet__body__date">• 7h</span>
                    </div>
                    <div className="tweet__body__text">{item.text}</div>
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
            </li>
        </NavLink>
    );
};

export default Tweet;