import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../common/Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchUsers } from '../../store/actions/FollowBarActions';
import { LoadingState } from '../../types/TweetsTypes';
import FollowItem from './FollowItem/FollowItem';
import "./FollowBar.scss"
import { NavLink } from 'react-router-dom';

const FollowBar = () => {
    const dispatch = useDispatch()
    const { items, loadingState } = useTypedSelector(state => state.followBar)


    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (loadingState === LoadingState.LOADING) {
        return <div><Loader /></div>
    }

    return (
        <ul className="follow">
            <h3>Кого читать</h3>
            {items.slice(0, 3).map((i, index) => <FollowItem item={i} key={i._id} />)}

            {items.length > 3 &&
                <NavLink to="/users" className="follow__show-more">Показать еще</NavLink>}
        </ul>
    );
};

export default FollowBar;