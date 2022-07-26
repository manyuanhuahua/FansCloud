import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import SongsBrowser from '../songBrowser';
import CreateAlbumForm from '../Album/CreateAlbumForm';
import './Navigation.css';
import CreateSongModal from '../songDetail/CreateSongModal';


function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

  // console.log(sessionUser)
    let sessionLinks;

    if (sessionUser && Object.keys(sessionUser).length >0) {
    sessionLinks = (
      <>
        <div className='profile-nav'>
        {/* <NavLink to="/albums/new" >Upload</NavLink> */}
        <NavLink to="/you/library" >Library</NavLink>
        <CreateSongModal />
        <ProfileButton user={sessionUser} />

        </div>
      </>

    );
    }else{
        sessionLinks=(
            <>
            <div>
                <LoginFormModal />
                <SignUpFormModal />
                {/* <NavLink to='/signup'>Create account</NavLink> */}

            </div>
            </>
        )
    }

    return (
      <>
        <div>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </div>


      </>


      );
    }

export default Navigation;
