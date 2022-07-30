import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory,Link } from "react-router-dom";
import "./currentUser.css"

function ProfileButton({ user }) {
    const history = useHistory()
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
    dispatch(sessionActions.logout()).then(()=>history.push('/'));
  };

  return (
    <div className="profile-button-right-box">
        <div className='user-button' onClick={openMenu}>
            <img className='nr_img'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfW1gYTgGImZU-dxpl0Ez4rv8hfFj5UMOPgQ&usqp=CAU"/>
            {user?.username}
        </div>

        {showMenu && (
        <div className="nav-right">
          <ul className="slide">
            <li className="nr-li">
              <i class="fa-thin fa-user-robot"/>
            </li>
            <li className="nr-li">
              <div className="dd_menu">
                <div className="dd_left">
                    <ul>
                      <li>
                      <i class="fa-solid fa-cloud-music" />
                      </li>
                      <li>
                      <i class="fa-solid fa-image-polaroid-user" />
                      </li>
                      <li>
                      <i class="fa-solid fa-envelope-dot" />
                      </li>
                      <li>
                      <i class="fa-solid fa-right-from-bracket" />
                      </li>

                    </ul>
                </div>
                <div className="dd_right">
                  <ul>
                    <li><Link to='/currentUser'>Profile</Link></li>
                    <li><span>{user?.username}</span></li>
                    <li><span>{user?.email}</span></li>
                    <li><Link onClick={logout}>Log Out</Link></li>
                  </ul>

                </div>
              </div>

            </li>

          </ul>
        </div>
      )}


    </div>
  );
}

export default ProfileButton;
