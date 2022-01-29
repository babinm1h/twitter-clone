import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchTweetDataThunk } from '../../../store/actions/TweetActions';
import BackButton from '../../BackButton/BackButton';
import "./TweetPage.scss"

const TweetPage = () => {
    const dispatch = useDispatch()
    const { data, loadingState } = useTypedSelector(state => state.tweet)

    const params = useParams()
    const tweetId = params.id

    React.useEffect(() => {
        dispatch(fetchTweetDataThunk(tweetId!))
    }, [tweetId, dispatch])


    return (
        <>
            <div className="home__main_header">
                <BackButton /> <h2>Твит</h2>
            </div>
            <div className="tweet-page_tweet">
                {data.text}
            </div>
        </>
    );
};

export default TweetPage;