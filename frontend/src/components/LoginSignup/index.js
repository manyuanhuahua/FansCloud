import React from 'react';

import './LoginForm.css';
import SignupForm from '../SignupFormPage/SignupForm';
import LoginForm from '../LoginFormModal/LoginForm';
import "./LoginSignup.css"

function LoginSignupForm(){




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
