import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../common/Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchTrendsThunk } from '../../store/actions/TrendsActions';
import { LoadingState } from '../../types/TweetsTypes';
import "./TrendsBar.scss"

const TrendsBar = () => {
    const dispatch = useDispatch()
    const { items, loadingState } = useTypedSelector(state => state.trends)

    React.useEffect(() => {
        dispatch(fetchTrendsThunk())
    }, [])


    if (loadingState === LoadingState.LOADING) {
        return <Loader />
    }

    return (
        <ul className="trends">
            <h3>Тренды для вас</h3>
            {/* {items.map(i =>
                <li className="trends__item" key={i.name}>
                    <p className="trends__item_title">{i.name}</p>
                    <p className="trends__item_tweets">{i.count} Твитов</p>
                </li>)} */}
        </ul>
    );
};

export default TrendsBar;