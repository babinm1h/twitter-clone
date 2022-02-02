import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../common/Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchTweetsThunk } from '../../../store/actions/TweetsActions';
import { LoadingState } from '../../../types/TweetsTypes';
import Tweet from '../Tweet/Tweet';
import TweetForm from '../TweetForm/TweetForm';

const TweetsList = () => {
    const { items, loadingState } = useTypedSelector(state => state.tweets)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchTweetsThunk())
    }, [dispatch])

    return (
        <>
            <div className="home__main_header">
                <h2>Главная</h2>
            </div>

            <TweetForm loadingState={loadingState} />

            <div className="tweets">
                <ul className="tweets-list">
                    {loadingState === LoadingState.LOADING
                        ? <div className="tweets__loader"><Loader /></div>
                        : items.map(i => <Tweet item={i} key={i._id} />)}
                </ul>
            </div>
        </>
    );
};

export default TweetsList;