import React, { useEffect,useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import logo from "../../asset/fanscloud-logo.JPG"



import './Navigation.css';



import UserNav from '../CurrentUserpage/UserNav';


function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showSongs, setShowSongs] = useState(false)
    const [showAlbums, setShowAlbums] = useState(false)
  // console.log(sessionUser)
    let sessionLinks;



    return (!sessionUser) ? (
      <div className='user-mainContainer'>
            <div className='left-banner'>
                  <img classname='logo' src={logo}></img>
                  <NavLink exact to="/">Home</NavLink>
          </div>
        <div className='right-banner'>
            <div className='login'><LoginFormModal /></div>
            <div className='signup'><SignUpFormModal /></div>
            {/* <div className='demouser'><DemoUser /></div> */}

        </div>
      </div>
      ):(
        <UserNav />
      );

              }
export default Navigation;
