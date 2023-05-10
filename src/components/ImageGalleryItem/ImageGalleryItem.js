import PropTypes from "prop-types";

function ImageGalleryItem({id, webURL, largeURL, onImgClick}) { 
    return (
        <li className="ImageGalleryItem" key={id}>
            <img
                src={webURL}
                className="ImageGalleryItem-image"
                alt=""
                // id={largeURL}
                onClick={() => onImgClick(largeURL)}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    onImgClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;