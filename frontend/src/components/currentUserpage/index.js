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


const CurrentUser = ({showAlbums, showSongs})=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const albumList = useSelector(state => state.albums.albums);
    const [isUpload, setIsUpload] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(songList.length)
    // console.log('albumListcurrentUser', albumList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

      useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch,isUpload])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

      return  isLoaded && (sessionUser && Object.keys(sessionUser).length >0) && (

        <div className='user-page-main-container'>
              <div className='left-box'>
                  <div className='user-profile'>
                    <img className='profile-img' src='https://ktla.com/wp-content/uploads/sites/4/2020/05/GettyImages-1146390210.jpg' />
                  </div>
                  <h2>{sessionUser.username}</h2>
                  <div className='upload-album-button'>
                  <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/>
                  </div>
              </div>
                {/* <p>this is current user page</p> */}
              <div className='right-box'>
                   <CurrentUserAlbums albumList={albumList} isLoaded={isLoaded} isUpload={isUpload} setIsUpload={setIsUpload}/>
              </div>

                <div className='user-library-container'>
                    <div>
                        {/* {showSongs && (<CurrentUserSongs songList={songList} isLoaded={isLoaded}/>)} */}

                    </div>
                </div>
      </div>




      )


}

export default CurrentUser;
