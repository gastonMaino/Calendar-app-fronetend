import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventStartDelete());
    }

    return (
        <button
            className='btn-delete fab__danger'
            onClick={handleDelete}
        >
            <i className='fas fa-trash' ></i>
            <span className='fab__span'>Delete event</span>
        </button>
    )
}
