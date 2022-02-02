import React from 'react';
import { IUser } from '../../../types/TweetsTypes';
import { IDBUser } from '../../../types/UserTypes';
import userImg from "../../../img/Home/defaultUser.png"

interface IFollowItemProps {
    item: IDBUser
}

const FollowItem: React.FC<IFollowItemProps> = ({ item }) => {
    return (
        <li className="follow__item">
            <div className="follow__item__info">
                <img src={userImg} alt="user" className="small-avatar" />
                <div className="follow__item__author">
                    <div className="follow__item__name">{item.fullName}</div>
                    <div className="follow__item__nick">@{item.username}</div>
                </div>
            </div>
            <button className="follow__item__btn btn">Читать</button>
        </li>
    );
};

export default FollowItem;