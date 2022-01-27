import React from 'react';
import { AiOutlineClose } from "react-icons/ai"
import { BsTwitter } from "react-icons/bs"
import "./Modal.scss"
import "../../pages/Home/Home.scss"

interface IModalProps {
    title: string
    onClose: () => void
}

const Modal: React.FC<IModalProps> = ({ children, onClose, title }) => {
    return (
        <div className="modal">
            <div className="modal-block">
                <div className="modal-block-header">
                    <span onClick={onClose}>
                        <AiOutlineClose size={20} className="modal-block-header__close" />
                    </span>
                    <BsTwitter size={30} className="modal-block-header__twitter" />
                </div>
                <div className="modal-block-content">
                    <div className="modal-block-content__title">
                        {title}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;