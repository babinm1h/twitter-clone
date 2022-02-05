import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Modal from '../../common/Modal/Modal';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import userImg from "../../img/Home/defaultUser.png"
import { logout } from '../../store/actions/UserActions';
import "./AuthUser.scss"

const AuthUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data } = useTypedSelector(state => state.user)
    const [logoutModal, setLogoutModal] = React.useState<boolean>(false)

    const onCloseModal = () => {
        setLogoutModal(false)
    }

    const onOpenModal = () => {
        setLogoutModal(true)
    }


    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <div className="auth-user" onClick={onOpenModal}>
                <img src={userImg} alt="user" className="small-avatar" />
                <div className="auth-user__content">
                    <div className="auth-user__info">
                        <p className="auth-user__name">{data?.fullName}</p>
                        <p className="auth-user__nick">{data?.username}</p>
                    </div>
                    <span onClick={onOpenModal}>
                        <BiLogOut size={22} color={"black"} />
                    </span>
                </div>
            </div>

            {logoutModal && <Modal onClose={onCloseModal} title={"Выйти из Твиттер"}>
                <div className="logout-modal">
                    <p className="logout-modal__text">
                        Вы всегда можете снова войти в систему в любое время. Если вы просто хотите сменить учетную запись, вы можете сделать это, добавив существующую учетную запись.
                    </p>
                    <button className="btn logout-modal__btn black" onClick={handleLogout}>
                        Выйти
                    </button>
                    <button className="btn logout-modal__btn white" onClick={onCloseModal}>
                        Отмена
                    </button>
                </div>
            </Modal>}
        </>
    );
};

export default AuthUser;