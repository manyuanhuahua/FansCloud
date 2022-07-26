import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

import './SignupForm.css';
const SignupForm = () =>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state=>state.session.user);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isArtist, setIsArtist] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState([]);



    if(sessionUser && Object.keys(sessionUser).length >0) return <Redirect to="/"/>

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password === confirmPassword) {
            setErrors([]);

            return dispatch(sessionActions.signup({email, username, password, firstName, lastName, isArtist, previewImage})).catch(async (res) => {
                          // const data = await res.json();
                          // console.log(data)
                          // if(data.user.errors) setErrors(data.user.errors);

                          // async (res) => {
                            // console.log("in the catch")

                            const data  = await res.json();

                            // console.log("data.error", data.errors)

                            if (data && data.errors) setErrors(data.errors);
                      })
    }

    return setErrors(['Confirm Password field must be the same as the Password field'])
  }
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
          </ul>
          <label>
            Username
            <input
              type="text"
              placeholder="Please input your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              placeholder="Please input your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              placeholder="Please input your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Not a creator
            <input
              type="radio"
              value="false"
              onChange={(e) => setIsArtist(false)}
              checked = {isArtist === false}
              required
            />
          </label>
          <label>
            I am a creator
            <input
              type="radio"
              value="true"
              onChange={(e) => setIsArtist(true)}
              checked = {isArtist === true}
              required
            />
          </label>
          <label>
            Email
            <input
              type="text"
              placeholder="Please input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Please create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Please confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
            <label>
            Profile Image
            <input
              type="text"
              placeholder="Define your profile image here"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      );
    }


export default SignupForm;
