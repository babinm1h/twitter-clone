import React, { ChangeEvent } from 'react';
import { BsImage, } from 'react-icons/bs';
import { ImgObj } from '../TweetForm';


interface IUploadImgProps {
    images: ImgObj[]
    setImages: React.Dispatch<React.SetStateAction<ImgObj[]>>
}

const UploadImg: React.FC<IUploadImgProps> = ({ setImages, images }) => {

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = ""
        if (file) {
            const fileObj = new Blob([file])
            setImages(prev => [...prev, {
                blobUrl: URL.createObjectURL(fileObj),
                file
            }])
        }
    }

    return (
        <>
            <input type="file" id="file-input" hidden onChange={handleImgUpload} />
            <button type="button" >
                <label htmlFor="file-input">
                    <BsImage className="action-icon" size={18} />
                </label>
            </button>
        </>
    );
};

export default UploadImg;


