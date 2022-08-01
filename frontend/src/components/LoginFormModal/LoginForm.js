import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm(){
    const history = useHistory()
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    // console.log("outside submit")

    const demo = {
      credential: 'JohnSmith',
      password: 'password'
    }

    const handleDemo = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login(demo)).catch(
        async (res) => {
          // console.log("in the catch")

          const data  = await res.json();

          // console.log("data.error", data.errors)

          if (data && data.errors) setErrors(data.errors);

        }
        ).then(()=>history.push('/currentUser'));
      };


    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          // console.log("in the catch")

          const data  = await res.json();

          // console.log("data.error", data.errors)

          if (data && data.errors) setErrors(data.errors);

        }).then(()=>history.push('/currentUser'));
      };



    // console.log('error before return',errors.map(e=>console.log('e',e)))


    return (
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-content'>


            <input id='credential'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder='Your email address or username'
              required
            />

            <input id='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Please Enter Your Password'
              required
            />

          <button id='login-button-click' type="submit">Log In</button>
          <button type="submit" onClick={handleDemo}>Demo User</button>
         </div>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </form>
      );
}

export default LoginForm;
