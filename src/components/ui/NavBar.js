import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <header className='ui__header'>
            <div className='ui__header-container' >
                <p className='ui__header-text' >{name}</p>
            </div>

            <button className='ui__header-btn' onClick={handleLogout} >
                <i className='fas fa-sign-out-alt' ></i>
                <span className='ui__header-span' >Logout</span>
            </button>

        </header>
    )
}