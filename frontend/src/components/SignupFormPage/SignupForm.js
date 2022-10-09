import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

import './SignupForm.css';
const SignupForm = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state=>state.session.user);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState([]);



    if(sessionUser && Object.keys(sessionUser).length >0) return <Redirect to="/"/>

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password === confirmPassword) {
            setErrors([]);

            return dispatch(sessionActions.signup({email, username, password, firstName, lastName, previewImage})).then(()=>history.push('/explore')).catch(async (res) => {


                            const data  = await res.json();


                            if (data && data.errors) setErrors(data.errors);
                      })
    }

    return setErrors(['Confirm Password field must be the same as the Password field'])
  }
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className='form-content'>
            <h3>NEW USER? SIGN UP NOW!</h3>

            <div className="form-input">
            <input
              type="text"
              placeholder="Please input your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="Please input your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="Please input your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="Please input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />



            <input
              type="password"
              placeholder="Please create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <input
              type="password"
              placeholder="Please confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Define your profile image here"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
            </div>

          <button className='signup-button-click' type="submit">Sign Up</button>
            <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
         </div>
        </form>
      );
    }


export default SignupForm;
