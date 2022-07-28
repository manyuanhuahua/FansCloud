import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

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
        ).then((you)=>history.push('/currentUser'));
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

        }
        ).then(()=>(!errors.length) ? history.push('/currentUser') : history.push('/')
       );
      };



    // console.log('error before return',errors.map(e=>console.log('e',e)))


    return (
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
          <button type="submit" onClick={handleDemo}>Demo User</button>
        </form>
      );
}

export default LoginForm;
