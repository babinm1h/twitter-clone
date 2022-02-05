import React from 'react';

interface ITweetImagesProps {
    images?: string[]
}

const TweetImages: React.FC<ITweetImagesProps> = ({ images }) => {
    return (
        <div className="tweet__images">
            {images && images.map(url => <div className="tweet__images__item"
                style={{ backgroundImage: `url(${url})` }} key={url}>
            </div>)}
        </div>
    );
};

export default TweetImages;