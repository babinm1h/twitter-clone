import React from 'react';

const FollowItem = () => {
    return (
        <li className="follow__item">
            <div className="follow__item__info">
                <img src="https://pbs.twimg.com/profile_images/1486424326626807809/95C-flGp_400x400.jpg" alt="user" className="small-avatar" />
                <div className="follow__item__author">
                    <div className="follow__item__name">m0NESY-</div>
                    <div className="follow__item__nick">@m0NESY13</div>
                </div>
            </div>
            <button className="follow__item__btn btn">Читать</button>
        </li>
    );
};

export default FollowItem;