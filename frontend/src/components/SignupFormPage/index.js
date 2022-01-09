import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
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
        <form onSubmit={handleSubmit} id='signupPage'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Username
                <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                email
                <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                password
                <input
                type='password'
                value={password}
                onChange={(e) => setPassowrd(e.target.value)}
                required
                />
            </label>
            <label>
                confirm password
                <input
                type='passowrd'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit">Sign up</button>
        </form>
    )
}

export default SignupFormPage;
