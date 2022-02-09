import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
    { title: "Tweets", path: "", index: 1 },
    { title: "Likes", path: "likes", index: 2 },
    { title: "Media", path: "media", index: 3 },
]

const ProfileTabs = () => {
    const [tab, setTab] = React.useState<number>(1)

    return (
        <nav className="profile__tabs">
            {tabs.map((t) => <NavLink to={`${t.path}`} key={t.index}
                onClick={() => setTab(t.index)}>
                <div className={t.index === tab
                    ? "profile__tabs__item profile__tabs__item_active"
                    : "profile__tabs__item"}>
                    <span>{t.title}</span>
                </div>
            </NavLink>)}
        </nav>
    );
};

export default ProfileTabs;