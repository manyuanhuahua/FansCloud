import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser)
    let sessionLinks;
    const songList = useSelector(state => state.songs);
    // console.log("songList", songList)

    if (sessionUser && Object.keys(sessionUser).length >0) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
    }else{
        sessionLinks=(
            <>
                <LoginFormModal />
                <NavLink to='/signup'>Create account</NavLink>
                <h2>this is seesion link navbar</h2>
                {/* {songList.map((song)=>{
                  return (
                    <ul>
                      <li>
                        {song}
                      </li>
                    </ul>
                  ) */}
                {/* })} */}
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
