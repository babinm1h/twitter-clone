import React from 'react';
import Loader from '../../../common/Loader/Loader';
import { ITweet, LoadingState } from '../../../types/TweetsTypes';
import Tweet from '../../Home/Tweet/Tweet';

interface IProfileTweetsProps {
    loadingState: LoadingState
    userTweets: ITweet[]
}

const ProfileTweets: React.FC<IProfileTweetsProps> = ({ loadingState, userTweets }) => {

    if (!userTweets.length) {
        return <div className="profile__content_empty">Список твитов пуст!</div>
    }
    return (
        <>
            {loadingState === LoadingState.LOADING
                ? <div className="tweets__loader"><Loader /></div>
                : userTweets.map(i => <Tweet item={i} key={i._id} />)}
        </>
    );
};

export default ProfileTweets;