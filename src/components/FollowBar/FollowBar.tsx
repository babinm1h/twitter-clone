import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../common/Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchFollowBarUsersThunk } from '../../store/actions/FollowBarActions';
import { LoadingState } from '../../types/TweetsTypes';
import FollowItem from './FollowItem/FollowItem';
import "./FollowBar.scss"

const FollowBar = () => {
    const dispatch = useDispatch()
    const { items, loadingState } = useTypedSelector(state => state.followBar)


    React.useEffect(() => {
        dispatch(fetchFollowBarUsersThunk())
    }, [])

    if (loadingState === LoadingState.LOADING) {
        return <div><Loader /></div>
    }

    return (
        <ul className="follow">
            <h3>Кого читать</h3>
            {items.map((i, index) => <FollowItem item={i} key={index} />)}
        </ul>
    );
};

export default FollowBar;