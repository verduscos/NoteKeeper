import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
import '../../context/Modal.css'
import LoginFormModal from '../LoginFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function SignupFormPage() {
const dispatch = useDispatch();
const sessionUser = useSelector(state => state.session.user);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassowrd] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [errors, setErrors] = useState([])

//if a session exists, redirect
if (sessionUser) return <Redirect to='/' />;

const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
}
    return (
        <div id='sigupformpage'>
            <form onSubmit={handleSubmit} id='signupPage'>
                <h1 id='signup-title'>NoteKeeper</h1>
                <p id='signup-text'>Remember everthing important.</p>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                    <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='inputssignup'
                    required
                    placeholder='Username'
                    />
                    <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='inputssignup'
                    placeholder='Email'
                    />
                    <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                    required
                    placeholder='Passoword'
                    className='inputssignup'
                    />
                    <input
                    type='passowrd'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder='Confirm Password'
                    className='inputssignup'
                    />
                <button id='signupPageButt' type="submit">Continue</button>
                {/* <p>Already a member?</p> */}
                {/* <LoginFormModal /> */}
            </form>
        </div>
    )
}

export default SignupFormPage;
