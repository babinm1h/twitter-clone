import React from 'react';
import { IDBUser } from '../../../types/UserTypes';
import userImg from "../../../img/Home/defaultUser.png"
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';

interface IFollowItemProps {
    item: IDBUser
}

const FollowItem: React.FC<IFollowItemProps> = ({ item }) => {
    const authId = useTypedSelector(state => state.user.data?._id)

    const isOwner = item._id === authId

    return (
        <li className="follow__item">
            <div className="follow__item__info">
                <NavLink to={`/${item.username}/${item._id}`}>
                    <img src={userImg} alt="user" className="small-avatar" />
                </NavLink>
                <div className="follow__item__author">
                    <div className="follow__item__name">{item.fullName}</div>
                    <div className="follow__item__nick">@{item.username}</div>
                </div>
            </div>
            <button className="follow__item__btn btn" disabled={isOwner}>Читать</button>
        </li>
    );
};

export default FollowItem;