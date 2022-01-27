import React from 'react';
import { FaRegComment } from "react-icons/fa"
import { FiRepeat } from "react-icons/fi"
import { BsTwitter, BsImage, BsUpload } from "react-icons/bs"
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai"

const Tweet = () => {
    return (
        <li className="tweet">
            <img src="https://img-cdn.hltv.org/playerbodyshot/LdHiQd529230U-hCMYRU4b.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=128%2C19%2C455%2C455&w=200&s=7a25a2d02a8414351f6007ca11d5a7c6" alt="user" className="small-avatar" />
            <div className="tweet__body">
                <div className="tweet__body_info">
                    <span className="tweet__body_name">Misha</span>
                    <span className="tweet__body_nick">@m1sha777</span>
                    <span className="tweet__body_date">• 7h</span>
                </div>
                <div className="tweet-body_text">Hello w0rld!!!</div>
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
    );
};

export default Tweet;