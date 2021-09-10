import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Modal } from '../modal/Modal';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStarAddNew, eventStartUpdated } from '../../actions/events';
// import { customStyles } from '../../helpers/centerModalStyles';

// Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endHour = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endHour.toDate()
}

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endHour.toDate());
    const [validTitle, setValidTitle] = useState(true);
    const [values, setValues] = useState(initEvent)
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const { title, notes, start, end } = values;

    useEffect(() => {
        if (activeEvent) {
            setValues(activeEvent)
        }else {
            setValues(initEvent)
        }
    }, [activeEvent, setValues])

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setValues(initEvent);

    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setValues({
            ...values,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setValues({
            ...values,
            end: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('error', 'the end date must be greater than start date', 'error')
            return;
        } else if (title.trim().length < 2) {
            setValidTitle(false);
            return;
        }

        if(activeEvent){
            dispatch(eventStartUpdated(values))
        }else {
            dispatch(eventStarAddNew(values))
        }

        setValidTitle(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            closeModal={closeModal}
        >
            <div className='container-title'>
                <h1>{activeEvent ? 'Update Event' : 'New event'}</h1>
            </div>

            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label>Start date and time:</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form__input'
                    />
                </div>
                <div className='form__group'>
                    <label>End date and time:</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className='form__input'
                    />
                </div>
                <div className='form__group'>
                    <label>title and notes:</label>
                    <input
                        type='text'
                        className={`form__input ${!validTitle && 'is-invalid'}`}
                        placeholder='title'
                        name='title'
                        autoComplete='off'
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__group'>
                    <label>Small description:</label>
                    <textarea
                        type="text"
                        className="form__text-area"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button
                    type='submit'
                    className='form__button'
                >
                    <i className='far fa-save' ></i>
                    Save
                </button>
            </form>


        </Modal>
    )
}
