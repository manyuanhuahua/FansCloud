import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import * as albumActions from '../../store/album'

import ProfileButton from './ProfileButton';
import logo from "../../asset/fanscloud-logo.JPG"
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
        dispatch(albumActions.getallbums()).then(()=>setIsLoaded(true))
      },[dispatch])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

    return (
      <div className='user-mainContainer'>
            {/* <div className='user-top-banner'> */}
            <div className='left-banner'>
                  <img classname='logo' src={logo}/>
                  <div className='left-banner-text'>
                    <Link to='/explore'>Explore</Link>
                    <Link to='/songs'>Songs</Link>
                    <Link to='/albums'>Albums</Link>
                    <Link to='/playlists'>Playlists</Link>
                  </div>
            </div>
                <div className='right-banner'>
                  {/* <div className='upload-album-button'>
                  <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/>
                  </div> */}
                  <ProfileButton user={sessionUser} />
                </div>
            </div>

      )


}

export default UserNav;
