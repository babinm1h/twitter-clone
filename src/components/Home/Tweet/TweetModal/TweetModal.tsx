import React from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import "./TweetModal.scss"

interface ITweetModalProps {
    handleDeleteTweet: () => void
    handleEdit?: () => void
}

const TweetModal: React.FC<ITweetModalProps> = ({ handleDeleteTweet, handleEdit }) => {


    return (
        <div className="tweet-popup">
            <ul className="tweet-popup__list">
                <li className="tweet-popup__item tweet-popup__item_red" onClick={handleDeleteTweet}>
                    <span><BsTrash size={17} /></span>
                    <p>Удалить</p>
                </li>
                {handleEdit && <li className="tweet-popup__item" onClick={handleEdit} >
                    <span><BsPencil size={17} /></span>
                    <p>Редактировать</p>
                </li>}
            </ul>
        </div >
    );
};

export default TweetModal;