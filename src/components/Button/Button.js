import PropTypes from "prop-types";

function Button({ onLoadMoreBtnClick }) { 
    return (
        <button
            onClick={onLoadMoreBtnClick}
            type="button"
            className="Button">
                Load more...
        </button>
    )
}

Button.propTypes = {
    onLoadMoreBtnClick: PropTypes.func.isRequired,
}

export default Button;