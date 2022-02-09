import React from 'react';
import { IDBUser } from '../../../types/UserTypes';
import userImg from "../../../img/Home/defaultUser.png"
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { followThunk, unfollowThunk } from '../../../store/actions/UserActions';

interface IFollowItemProps {
    item: IDBUser
}

const FollowItem: React.FC<IFollowItemProps> = ({ item }) => {
    const dispatch = useDispatch()
    const { data, } = useTypedSelector(state => state.user)

    const isOwner = item._id === data?._id

    const handleFollow = () => {
        if (item._id) dispatch(followThunk(item._id))
    }

    const handleUnfollow = () => {
        if (item._id) dispatch(unfollowThunk(item._id))
    }

    return (
        <li className="follow__item">
            <div className="follow__item__info">
                <NavLink to={`/${item.username}/${item._id}`}>
                    <img src={item.avatarUrl} alt="user" className="small-avatar" />
                </NavLink>
                <div className="follow__item__author">
                    <div className="follow__item__name">{item.fullName}</div>
                    <div className="follow__item__nick">@{item.username}</div>
                </div>
            </div>
            {!data?.following.includes(item._id!)
                ? <button className="follow__item__btn btn follow-btn" disabled={isOwner}
                    onClick={handleFollow}>
                    Подписаться
                </button>
                : <button className="follow__item__btn btn unfollow-btn" disabled={isOwner}
                    onClick={handleUnfollow}>
                    Отписаться
                </button>}
        </li>
    );
};

export default FollowItem;