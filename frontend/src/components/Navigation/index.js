import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser)
    let sessionLinks;

    if (sessionUser && Object.keys(sessionUser).length >0) {
    sessionLinks = (

        <ProfileButton user={sessionUser} />

    );
    }else{
        sessionLinks=(
            <>
                <LoginFormModal />
                <NavLink to='/signup'>Create account</NavLink>
                {/* <h2>this is seesion link navbar</h2> */}


            </>

        )
    }

    return (
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      );
    }

export default Navigation;
