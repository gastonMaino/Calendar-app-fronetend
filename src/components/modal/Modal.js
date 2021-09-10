import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ children, isOpen = false, closeModal }) => {

    const handleCloseModal = () => {
        closeModal()
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }

    return (
        <article onClick={handleCloseModal} className={`modal ${isOpen && 'is-open'}`}>
            <div className='modal-container' onClick={handleModalClick}>
                {children}
            </div>
        </article>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
}
