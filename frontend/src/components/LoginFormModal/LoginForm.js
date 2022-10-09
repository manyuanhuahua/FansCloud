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


    const demo = {
      credential: 'JohnSmith',
      password: 'password'
    }

    const handleDemo = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login(demo)).catch(
        async (res) => {


          const data  = await res.json();



          if (data && data.errors) setErrors(data.errors);

        }
        ).then(()=>history.push('/explore'));
      };


    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {


          const data  = await res.json();



          if (data && data.errors) setErrors(data.errors);

        }).then(()=>history.push('/explore'));
      };






    return (
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-content'>

            <h3 style={{margin:'0'}}>WELCOME BACK!</h3>
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
