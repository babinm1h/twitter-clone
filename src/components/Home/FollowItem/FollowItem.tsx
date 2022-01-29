import React from 'react';
import { IUser } from '../../../types/TweetsTypes';

interface IFollowItemProps {
    item: IUser
}

const FollowItem: React.FC<IFollowItemProps> = ({ item }) => {
    return (
        <li className="follow__item">
            <div className="follow__item__info">
                <img src={item.avatarUrl} alt="user" className="small-avatar" />
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