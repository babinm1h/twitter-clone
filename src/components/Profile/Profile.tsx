import React from 'react';
import { useParams } from 'react-router';
import BackButton from '../BackButton/BackButton';
import userImg from "../../img/Home/defaultUser.png"
import { BsCalendarWeek } from "react-icons/bs"
import "./Profile.scss"
import { NavLink } from 'react-router-dom';
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
import { uploadAvatar, uploadImg } from '../../utils/uploadImg';
import { setUserAboutThunk, uploadAvatarThunk } from '../../store/actions/UserActions';
import { useFormik } from 'formik';
import * as Yup from "yup"

const Profile = () => {
    const [modal, setModal] = React.useState<boolean>(false)
    const [ava, setAva] = React.useState<ImgObj>({} as ImgObj)

    const dispatch = useDispatch()
    const { username, id } = useParams()
    const { data, loadingState: profileLoading } = useTypedSelector(state => state.profile)
    const { loadingState, userTweets } = useTypedSelector(state => state.tweets)
    const ownerId = useTypedSelector(state => state.user.data?._id)

    const isOwner = data?._id === ownerId

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


    const handleSaveChanges = async () => {

    }

    const formik = useFormik({
        initialValues: {
            about: ""
        },

        validationSchema: Yup.object().shape({
            about: Yup.string().max(300, "Максимальное количество символов - 300")
        }),

        onSubmit: async (values) => {
            if (ava.file) {
                const { url } = await uploadAvatar(ava?.file)
                dispatch(uploadAvatarThunk(url))
            }
            dispatch(setUserAboutThunk(values.about))
            dispatch(fetchProfileData(id!))
            setModal(false)
        }
    })


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
                    <img src={data?.avatarUrl || userImg} alt="userimg" className="avatar profile__avatar" />
                </div>

                <div className="profile__owner">
                    <div className="profile__edit-block">
                        <span></span>
                        {isOwner && <button className="btn profile__edit-btn" onClick={handleOpenModal}>
                            Изменить профиль
                        </button>}
                    </div>
                    <ul className="profile__info">
                        <li className="profile__name">{data?.fullName}</li>
                        <li className="profile__nick">@{data?.username}</li>
                        <li className="profile__status">
                            <p>{data?.about}</p>
                        </li>
                        <li className="profile__joined">
                            <BsCalendarWeek /> <p>Joined January 2022</p>
                        </li>
                    </ul>

                    <nav className="profile__tabs">
                        <NavLink to="">
                            <div className="profile__tabs__item profile__tabs__item_active">
                                <span>Tweets</span>
                            </div>
                        </NavLink>
                    </nav>

                    <div className="profile__content">
                        {loadingState === LoadingState.LOADING
                            ? <div className="tweets__loader"><Loader /></div>
                            : userTweets.map(i => <Tweet item={i} key={i._id} />)}
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
                        <button className="btn profile__edit__btn"
                            type="submit">
                            Сохранить
                        </button>
                    </form>
                </div>
            </Modal>}
        </>
    );
};

export default Profile;