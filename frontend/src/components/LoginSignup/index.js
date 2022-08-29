import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './LoginForm.css';
import SignupForm from '../SignupFormPage/SignupForm';
import LoginForm from '../LoginFormModal/LoginForm';
import "./LoginSignup.css"

function LoginSignupForm(){

    // console.log('error before return',errors.map(e=>console.log('e',e)))


    return (
        <section className='main-body'>
        <div className='main-form'>
            <input type='checkbox' id='chk' aria-hidden='true' />
            <div className='sign-up-form'>
                <label for='chk' aria-hidden='true'>Sign up</label>
                {<SignupForm />}
            </div>
            <div className='login-form'>
                <label for='chk' aria-hidden='true'>Login</label>
                {<LoginForm />}
            </div>
            </div>
        </section>

      );
}

export default LoginSignupForm;
