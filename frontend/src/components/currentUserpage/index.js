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


const CurrentAlbums = ({showAlbums, showSongs})=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs);
    const albumList = useSelector(state => state.albums);
    const [isUpload, setIsUpload] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    const [songLoaded, setSongLoaded] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(songList.length)
    // console.log('albumListcurrentUser', albumList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setSongLoaded(true))
      },[dispatch])

      useEffect(()=>{
        dispatch(albumActions.getallbums()).then(()=>setIsLoaded(true))
      },[dispatch,isUpload])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

      return  songLoaded && isLoaded && (sessionUser && Object.keys(sessionUser).length >0) && (

        <div className='user-page-main-container'>
              <div className='left-box'>
                  <h2 style={{marginRight:'30px'}}>My Album List</h2>
                  <div className='upload-album-button'>
                  <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/>
                  </div>
              </div>
                {/* <p>this is current user page</p> */}
              <div className='right-box'>
                   <CurrentUserAlbums albumList={albumList} isLoaded={isLoaded} isUpload={isUpload} setIsUpload={setIsUpload}/>
              </div>

      </div>




      )


}

export default CurrentAlbums;
