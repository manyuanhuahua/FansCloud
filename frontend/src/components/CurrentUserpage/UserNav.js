
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import ProfileButton from './ProfileButton';
import logo from "../../asset/fanscloud-logo.JPG"
import "./currentUser.css"




const UserNav = ()=>{
    const sessionUser = useSelector(state => state.session.user);



    return (
      <div className='user-mainContainer'>

            <div className='left-banner'>
                  <img classname='logo' alt='' src={logo}/>
                  <div className='left-banner-text'>
                    <Link to='/explore'>Explore</Link>
                    <Link to='/songs'>Songs</Link>
                    <Link to='/albums'>Albums</Link>
                    <Link to='/playlists'>Playlists</Link>
                  </div>
            </div>
            <div className='mid-banner' style={{margin:'auto'}}>
            <a href='http://www.ting-f.com/'>
                  <p style={{textDecoration:'none',fontSize:'12px',color:'#fff',marginRight:'10px'}}>Meet Developer</p>
            </a>
            <a href='https://github.com/manyuanhuahua'>
            <img
            alt=''
            src='https://pnggrid.com/wp-content/uploads/2022/03/Github-Logo-White.png'
            style={{width:'28px',height:'28px',borderRadius:'50%',marginRight:'10px'}}
            ></img>
            </a>
            <a href='https://github.com/manyuanhuahua'>
            <img
            alt=''
            src='https://images.squarespace-cdn.com/content/v1/58a268ce46c3c407af0ff079/1493784043398-4GWVZA89VZ11CKVLCKI4/Linkedin+icon+white.png'
            style={{width:'28px',height:'28px',borderRadius:'50%',marginRight:'10px'}}
            ></img>
            </a>
          </div>
                <div className='right-banner'>
                  <ProfileButton user={sessionUser} />
                </div>
            </div>

      )


}

export default UserNav;
