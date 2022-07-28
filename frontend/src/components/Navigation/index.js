import React, { useEffect,useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import CurrentUser from '../currentUserpage/UploadButton'



import './Navigation.css';

import UploadBotton from '../currentUserpage/UploadButton';
import DemoUser from './demoUser';
import UserNav from '../currentUserpage/UserNav';


function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showSongs, setShowSongs] = useState(false)
    const [showAlbums, setShowAlbums] = useState(false)
  // console.log(sessionUser)
    let sessionLinks;

    // if (sessionUser && Object.keys(sessionUser).length >0) {
    // sessionLinks = (
    //   <>
    //     <div className='profile-nav'>
    //     {/* <NavLink to="/albums/new" >Upload</NavLink> */}
    //     <UploadBotton />
    //     {/* <CreateSongModal /> */}
    //     <ProfileButton user={sessionUser} />


    //     </div>
    //   </>

    // );
    // }else{
    //     sessionLinks=(
    //         <>
    //         <div>

    //             {/* <DemoUser /> */}


    //         </div>
    //         </>
    //     )
    // }

    return (!sessionUser) ? (
      <div className='user-mainContainer'>
            <div className='user-top-banner'>
                  <img src='https://cdn.iconscout.com/icon/free/png-256/soundcloud-4069940-3365459.png'></img>
                  <NavLink exact to="/">Home</NavLink>
                  <LoginFormModal />
                  <SignUpFormModal />
                  <DemoUser />

          </div>
        <div className='banner-right'>

        </div>


      </div>


      ):(
        <UserNav />
      );

              }
export default Navigation;
