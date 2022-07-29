import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import * as albumActions from '../../store/album'
import UploadBotton from './UploadButton';
import ProfileButton from './ProfileButton';
import CreateAlbumForm from '../Album/CreateAlbumForm';
import CurrentUserAlbums from './CurrentUserAlbums';
import CurrentUserSongs from './CurrentUserSongs';
import "./currentUser.css"



const UserNav = ()=>{
    const dispatch = useDispatch()


    const sessionUser = useSelector(state => state.session.user);
    const [showForm, setShowForm] = useState(false)
    const [showSongs, setShowSongs] = useState(false)
    const [showAlbums, setShowAlbums] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(songList.length)
    // console.log('albumListcurrentUser', albumList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

      useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

      return (
            <div className='user-mainContainer'>
              <div className='user-top-banner'>
                <div className='banner-left'>
                  <ul>
                    {/* <li>
                      <img src='https://cdn.iconscout.com/icon/free/png-256/soundcloud-4069940-3365459.png'></img>
                    </li> */}
                    {/* <li>
                      <Link  to='/'>Overview</Link>
                    </li> */}
                    {/* <li>
                      <Link to='/currentUser/songs'>Songs</Link> */}
                      {/* <CurrentUserSongs showAlbums={showAlbums} showSongs={showSongs}/> */}
                    {/* </li> */}
                    <li>
                      <Link to='/currentUser/albums'>Overview</Link>
                      {/* <CurrentUserAlbums /> */}
                    </li>
                    <li>
                    <UploadBotton />
                    </li>
                    <li>
                    <ProfileButton user={sessionUser} />
                    </li>
                </ul>

                </div>
                        {/* <CurrentUser showSongs={showSongs} showAlbums={showAlbums} /> */}





                </div>

            </div>

      )


}

export default UserNav;
