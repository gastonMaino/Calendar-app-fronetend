import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLogin, startRegister } from '../../actions/auth'
import { validateEmail, validatePasswordModerate } from '../../helpers/validators'
import { useForm } from '../../hooks/useForm/useForm'

const initialState = {
    Rname: false,
    Remail: false,
    Rpassword: false
}

export const LoginScreen = () => {
    const dispatch = useDispatch()
    const [valueError, setValueError] = useState(initialState)

    const [valuesLogin, handleLoginInputChange] = useForm({
        lemail: '',
        lpassword: ''
    })
    const [valuesRegister, handleRegisterInputChange] = useForm({
        rname: '',
        remail: '',
        rpassword: '',
        rpassword2: ''
    })

    const { lemail, lpassword } = valuesLogin
    const { rname, remail, rpassword, rpassword2 } = valuesRegister
    const { Rname, Remail, Rpassword} = valueError

    const isValid = () => {
        if (rname.length < 2) {
            setValueError({
                ...initialState,
                Rname: true
            })
            return false
        } else if (validateEmail(remail)) {
            setValueError({
                ...initialState,
                Remail: true
            })

            return false
        } else if (validatePasswordModerate(rpassword) || rpassword !== rpassword2) {
            setValueError({
                ...initialState,
                Rpassword: true
            })

            return false
        }

        return true
    }

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(startLogin(lemail, lpassword))
    }
    
    const handleRegister = (e) => {
        e.preventDefault()
        if(isValid()){
            dispatch(startRegister(remail, rpassword, rname))
        }
    }

    return (
        <article className='auth__article'>
            <h1 className='auth__article-title'>Calendar</h1>
            <div className='auth__container'>
                <section className='auth__login' >
                    <h2 className='auth__login-title' >Login</h2>
                    <form
                        onSubmit={handleLogin}
                        className='auth__login-form'
                    >
                        <div className='auth__login-email'>
                            <label htmlFor='email' >Email</label>
                            <input
                                type='text'
                                placeholder='Email'
                                id='email'
                                name='lemail'
                                value={lemail}
                                onChange={handleLoginInputChange}
                                className='auth__input'
                            />
                        </div>
                        <div className='auth__login-password'>
                            <label htmlFor='password' >Password</label>
                            <input
                                type='password'
                                placeholder='password'
                                id='password'
                                name='lpassword'
                                value={lpassword}
                                onChange={handleLoginInputChange}
                                className='auth__input'
                            />
                        </div>
                        <button
                            value='login'
                            type='submit'
                            className='auth__login-btn'
                        >
                            Login
                        </button>
                    </form>
                </section>
                <section className='auth__register'>
                    <h2 className='auth__register-title' >Register</h2>
                    <form
                        className='auth__register-form'
                        onSubmit={handleRegister}
                    >
                        <div className='auth__register-name' >
                            <label htmlFor='name' >Name</label>
                            <input
                                type='text'
                                placeholder='Name'
                                id='name'
                                name='rname'
                                value={rname}
                                onChange={handleRegisterInputChange}
                                className={`auth__register-input ${(Rname) && 'auth__register-input-danger'}`}
                            />
                        </div>
                        <div className='auth__register-email' >
                            <label htmlFor='email' >Email</label>
                            <input
                                type='text'
                                placeholder='Email'
                                id='email'
                                name='remail'
                                value={remail}
                                onChange={handleRegisterInputChange}
                                className={`auth__register-input ${(Remail) && 'auth__register-input-danger'}`}
                            />
                        </div>
                        <div className='auth__register-password' >
                            <label htmlFor='password' >Password</label>
                            <input
                                type='password'
                                placeholder='password'
                                id='password'
                                name='rpassword'
                                value={rpassword}
                                onChange={handleRegisterInputChange}
                                className={`auth__register-input ${(Rpassword) && 'auth__register-input-danger'}`}
                            />

                            <label htmlFor='password' > Confirm password</label>
                            <input
                                type='password'
                                placeholder='password'
                                id='password'
                                name='rpassword2'
                                value={rpassword2}
                                onChange={handleRegisterInputChange}
                                className={`auth__register-input ${(Rpassword) && 'auth__register-input-danger'}`}
                            />
                        </div>
                        <button
                            value='register'
                            type='submit'
                            className='auth__register-btn'
                        >
                            Register
                        </button>
                    </form>
                </section>
            </div>
        </article>
    )
}
