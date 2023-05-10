// import React, { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, imgUrl}) { 
    useEffect(() => { 
        const handleEscapeClick = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscapeClick);

        return () => window.removeEventListener('keydown', handleEscapeClick);
    }, [onClose])
    
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };
    

    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick} >
            <div className="Modal">
                <img src={imgUrl} className="Modal-img" alt="" />
            </div>
        </div>,
    modalRoot
    );
};

Modal.propTypes = {
        onClose: PropTypes.func.isRequired,
        imgUrl: PropTypes.string.isRequired,
    };

export default Modal;


// class Modal extends Component { 
//      static propTypes = {
//         onClose: PropTypes.func.isRequired,
//         imgUrl: PropTypes.string.isRequired,
//     };
// // для ХУКА см конспект useEffect // + см 2:15:00 (и 1:24:00) 1го видео
//     componentDidMount() {
//         window.addEventListener('keydown', this.handleEscapeClick)
//     };

// // для ХУКА см конспект useEffect // + см 1:40:00) 1го видео
//     componentWillUnmount() { 
//         window.removeEventListener('keydown', this.handleEscapeClick)
//     };

//     handleEscapeClick = event => {
//         if (event.code === 'Escape') {
//             this.props.onClose();
//         }
//     };

//     handleBackdropClick = event => {
//         if (event.currentTarget === event.target) {
//             this.props.onClose();
//         }
//     };

//     render() { 
//         return createPortal(
//             <div className="Overlay" onClick={this.handleBackdropClick} >
//                 <div className="Modal">
//                     <img src={this.props.imgUrl} className="Modal-img" alt="" />
//                 </div>
//             </div>,
//             modalRoot
//         );
//     }

// };

// export default Modal;