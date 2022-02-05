import React from 'react';
import { useParams } from 'react-router';
import BackButton from '../BackButton/BackButton';
import userImg from "../../img/Home/defaultUser.png"
import { BsCalendarWeek } from "react-icons/bs"
import "./Profile.scss"
import { NavLink } from 'react-router-dom';
import Loader from '../../common/Loader/Loader';
import { LoadingState } from '../../types/TweetsTypes';
import Tweet from '../Home/Tweet/Tweet';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Profile = () => {
    const { username } = useParams()
    const { items, loadingState } = useTypedSelector(state => state.tweets)


    return (
        <>
            <div className="home__main_header">
                <BackButton /><h2>{username}</h2>
            </div>

            <div className="profile">
                <div className="profile__background" >
                    <img src={false || "https://pbs.twimg.com/profile_images/1468082946108239876/5UVLr4HF_400x400.jpg"} alt="userimg" className="avatar profile__avatar" />
                </div>

                <div className="profile__owner">
                    <div className="profile__edit-block">
                        <span></span>
                        <button className="btn profile__edit-btn">Изменить профиль</button>
                    </div>
                    <ul className="profile__info">
                        <li className="profile__name">mihail777</li>
                        <li className="profile__nick">@mihail777</li>
                        <li className="profile__status">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi suscipit quo eligendi dolor, ea alias voluptates minima corrupti repellat iusto doloribus veniam.</p>
                        </li>
                        <li className="profile__joined">
                            <BsCalendarWeek /> <p>Joined January 2022</p>
                        </li>
                    </ul>

                    <nav className="profile__tabs">
                        <NavLink to="">
                            <div className="profile__tabs__item profile__tabs__item_active">
                                <span>Tweets</span>
                            </div>
                        </NavLink>
                    </nav>

                    <div className="profile__content">
                        {loadingState === LoadingState.LOADING
                            ? <div className="tweets__loader"><Loader /></div>
                            : items.map(i => <Tweet item={i} key={i._id} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;