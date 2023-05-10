import ImageGalleryItem from "components/ImageGalleryItem";
import PropTypes from "prop-types";


function ImageGallery({ images, onImgClick }) { 
    return (
        <ul className="ImageGallery">
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    webURL={image.webformatURL}
                    largeURL={image.largeImageURL}
                    onImgClick={onImgClick}
                />
            ))               
            }
        </ul>
    )
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })),
    onImgClick: PropTypes.func.isRequired,
};


export default ImageGallery;