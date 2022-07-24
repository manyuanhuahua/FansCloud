import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      <h2>this is login user's profile page</h2>
      {/* the home page of user profile should list all the playlist for current user */}

      {/* <NavLink exact to="/songs">Songs</NavLink> */}
            <NavLink exact to="/songs">Playlists</NavLink>

    </>
  );
}

export default ProfileButton;
