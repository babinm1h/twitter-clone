import React from 'react';
import { HiArrowLeft } from "react-icons/hi"
import { useNavigate } from 'react-router';

const BackButton = () => {
    const navigate = useNavigate()

    const handleBtnClick = () => {
        return navigate(-1)
    }

    return (
        <span className="back__btn">
            <HiArrowLeft size={18} onClick={handleBtnClick} />
        </span>
    );
};

export default BackButton;