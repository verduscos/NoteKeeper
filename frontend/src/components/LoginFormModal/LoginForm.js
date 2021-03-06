import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../Navigation/Navigation.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
      );
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='modal'>
      <h2 className='modal-title'>Log In!</h2>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className='inputs'
          placeholder='Username or Email'
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='inputs'
          placeholder='Password'
          required
        />

      <button className="modalButts" type="submit">Log In</button>
    </form>
    </>
  );
}

export default LoginForm;
