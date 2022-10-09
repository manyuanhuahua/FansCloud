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

    let sessionLinks;



    return (!sessionUser) ? (
      <div className='user-mainContainer'>
          <div className='left-banner'>
                  <img classname='logo' src={logo}></img>
                  <NavLink exact to="/">Home</NavLink>

          </div>
          <div className='mid-banner' style={{margin:'auto'}}>
            <Link href='http://www.ting-f.com/'
                style={{textDecoration:'none',fontSize:'12px',color:'#fff',marginRight:'10px'}}>
                  Meet Developer
            </Link>
            <a href='https://github.com/manyuanhuahua'>
            <img
            src='https://pnggrid.com/wp-content/uploads/2022/03/Github-Logo-White.png'
            style={{width:'28px',height:'28px',borderRadius:'50%',marginRight:'10px'}}
            ></img>
            </a>
            <a href='https://github.com/manyuanhuahua'>
            <img
            src='https://www.citypng.com/public/uploads/preview/hd-white-outline-linkedin-round-icon-png-31624153887ernclzsksg.png'
            style={{width:'28px',height:'28px',borderRadius:'50%',marginRight:'10px'}}
            ></img>
            </a>
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
