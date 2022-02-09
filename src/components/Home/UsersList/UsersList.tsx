import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../common/Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchUsers } from '../../../store/actions/FollowBarActions';
import { LoadingState } from '../../../types/TweetsTypes';
import BackButton from '../../BackButton/BackButton';
import FollowItem from '../../FollowBar/FollowItem/FollowItem';

const UsersList = () => {
    const { items, loadingState } = useTypedSelector(state => state.followBar)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (loadingState === LoadingState.LOADING) return <div className="loading"><Loader /></div>

    return (
        <>
            <div className="home__main_header">
                <BackButton /> <h2>Пользователи</h2>
            </div>
            {items.map(i => <FollowItem item={i} key={i._id} />)}
        </>
    );
};

export default UsersList;