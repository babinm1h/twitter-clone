import React from 'react';
import { Route, Routes, useParams } from 'react-router';
import BackButton from '../BackButton/BackButton';
import { BsCalendarWeek } from "react-icons/bs"
import "./Profile.scss"
import Loader from '../../common/Loader/Loader';
import { LoadingState } from '../../types/TweetsTypes';
import Tweet from '../Home/Tweet/Tweet';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchUserTweets } from '../../store/actions/TweetsActions';
import { fetchProfileData } from '../../store/actions/ProfileActions';
import Modal from '../../common/Modal/Modal';
import { FiCamera } from "react-icons/fi"
import { ImgObj } from '../Home/TweetForm/TweetForm';
import { uploadAvatar } from '../../utils/uploadImg';
import { followThunk, setUserAboutThunk, unfollowThunk, uploadAvatarThunk } from '../../store/actions/UserActions';
import { useFormik } from 'formik';
import * as Yup from "yup"
import Linkify from 'linkify-react';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import ProfileTweets from './ProfileTweets/ProfileTweets';




const Profile = () => {
    const [modal, setModal] = React.useState<boolean>(false)
    const [ava, setAva] = React.useState<ImgObj>({} as ImgObj)

    const dispatch = useDispatch()
    const { username, id } = useParams()
    const { data, loadingState: profileLoading } = useTypedSelector(state => state.profile)
    const { loadingState, userTweets } = useTypedSelector(state => state.tweets)
    const { data: myData } = useTypedSelector(state => state.user)

    const isOwner = data?._id === myData?._id

    React.useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
            dispatch(fetchUserTweets(id))
        }
    }, [id, dispatch])


    const handleCloseModal = () => {
        setModal(false)
    }
    const handleOpenModal = () => {
        setModal(true)
    }

    const handleAvaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            const fileObj = new Blob([file])
            setAva({ blobUrl: URL.createObjectURL(fileObj), file })
        }
    }

    const formik = useFormik({
        initialValues: {
            about: data?.about || ""
        },

        validationSchema: Yup.object().shape({
            about: Yup.string().max(300, "Максимальное количество символов - 300")
        }),

        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            if (ava.file) {
                const { url } = await uploadAvatar(ava?.file)
                dispatch(uploadAvatarThunk(url))
                dispatch(setUserAboutThunk(values.about))
                dispatch(fetchProfileData(id!))
                setModal(false)
            } else {
                dispatch(setUserAboutThunk(values.about))
                dispatch(fetchProfileData(id!))
                setModal(false)
            }
        }
    })

    const handleFollow = () => {
        dispatch(followThunk(data?._id!))
    }
    const handleUnfollow = () => {
        dispatch(unfollowThunk(data?._id!))
    }

    if (profileLoading === LoadingState.LOADING) {
        return <div className="loading"><Loader /></div>
    }

    return (
        <>
            <div className="home__main_header">
                <BackButton />
                <div>
                    <h2>{username}</h2>
                    <p>{userTweets.length} Tweets</p>
                </div>
            </div>

            <div className="profile">
                <div className="profile__background" >
                    <img src={data?.avatarUrl} alt="userimg" className="avatar profile__avatar" />
                </div>

                <div className="profile__owner">
                    <div className="profile__edit-block">
                        <span></span>
                        {isOwner ? <button className="btn profile__edit-btn" onClick={handleOpenModal}>
                            Изменить профиль
                        </button>
                            : !myData?.following.includes(data?._id!)
                                ? <button className="follow__item__btn btn follow-btn"
                                    onClick={handleFollow}>
                                    Подписаться
                                </button>
                                : <button className="follow__item__btn btn unfollow-btn"
                                    onClick={handleUnfollow}>
                                    Отписаться
                                </button>}
                    </div>
                    <ul className="profile__info">
                        <li className="profile__name">{data?.fullName}</li>
                        <li className="profile__nick">@{data?.username}</li>
                        <li className="profile__about">
                            <Linkify><p>{data?.about}</p></Linkify>
                        </li>
                        <li className="profile__joined">
                            <BsCalendarWeek /> <p>Зарегестрировался: 2022</p>
                        </li>
                        <li className="profile__follow-info">
                            <p><span className="follow-count">{data?.following.length}</span>Подписок</p>
                            <p><span className="follow-count">{data?.followers.length}</span>Подписчиков</p>
                        </li>
                    </ul>

                    <ProfileTabs />

                    <div className="profile__content">
                        <Routes>
                            <Route path=""
                                element={<ProfileTweets loadingState={loadingState}
                                    userTweets={userTweets} />} />
                            <Route path="/likes"
                                element={<div className="profile__content_empty">Список пуст!</div>} />
                            <Route path="/media"
                                element={<div className="profile__content_empty">Список пуст!</div>} />
                        </Routes>
                    </div>
                </div>
            </div>


            {modal && <Modal title="Изменить профиль" onClose={handleCloseModal}>
                <div className="profile__edit">
                    <div className="profile__edit__avatar-block avatar">
                        <label className="profile__edit__avatar" htmlFor="photo-input">
                            <input hidden type="file" id="photo-input" onChange={handleAvaUpload}
                                accept="image/png, image/jpeg, image/jpg" />
                            <img src={ava.blobUrl || data?.avatarUrl} alt="userimg" className="avatar" />
                            <div className="profile__edit__camera-icon" >
                                <FiCamera size={25} color={"white"} />
                            </div>
                        </label>
                    </div>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <label htmlFor="about" className="profile__edit__label">About</label>
                        <textarea className="profile__edit__input" id="about"
                            onChange={formik.handleChange} value={formik.values.about} />
                        <button className="btn profile__edit__btn" type="submit"
                            disabled={formik.isSubmitting || !!formik.errors.about}>
                            Сохранить
                        </button>
                    </form>
                </div>
            </Modal>}
        </>
    );
};

export default Profile;