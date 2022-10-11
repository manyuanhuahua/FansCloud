import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory} from "react-router-dom";
import "./currentUser.css"

function ProfileButton() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user);


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

  const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

  return (
    <div className="profile-button-right-box">
        <div className='user-button' onClick={openMenu} style={{cursor:'pointer'}}>
            <img className="nr-img"
              alt=""
              src={user.previewImage? user.previewImage : defaultImg}
              style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg',width: '30px',
              height: '30px',
              borderRadius: '50%',
              objectFit:'cover',
            }}
              onError={imgError}
            />
            <p style={{marginLeft:'10px'}}>{user?.username}</p>
        </div>

        {showMenu && (
        <div className="nav-right">
          <ul className="slide">
            <li className="nr-li" key='menubutton'>
              <i class="fa-thin fa-user-robot"/>
            </li>
            <li className="nr-li" key='menu'>
              <div className="dd_menu">
                <div className="dd_left">
                    <ul>
                      <li key='name'>
                      <i class="fa-solid fa-id-card" />
                      </li>
                      <li key='email'>
                      <i class="fa-solid fa-inbox" />
                      </li>
                      <li key='log-out'>
                      <i class="fa-solid fa-right-from-bracket" />
                      </li>

                    </ul>
                </div>
                <div className="dd_right">
                  <ul>
                    <li key='textName'><span>{user?.username}</span></li>
                    <li key='textEmail'><span>{user?.email}</span></li>
                    <li key='textLogout' ><span onClick={logout} style={{cursor:'hover'}}>Log Out</span></li>
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
