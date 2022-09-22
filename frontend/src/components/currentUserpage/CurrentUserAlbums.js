import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getYourALbumsThunk} from '../../store/album'
import UploadBotton from './UploadButton';
// import * as albumActions from '../../store/album'

const CurrentUserAlbums = ({isUpload, setIsUpload})=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)
    const yourAlbumsObj = useSelector(state => state.albums);
    const yourAlbums = Object.values(yourAlbumsObj);

    // const [isUpload, setIsUpload] = useState(false)


    // const yourAlbums = albumList.filter((album)=> album.userId === sessionUser.id);

    useEffect(()=>{
        dispatch(getYourALbumsThunk()).then(()=>setIsLoaded(true))
      },[dispatch,isUpload])
    // console.log('yourAlbums',yourAlbums)


      return isLoaded && (
        <>
            <div className='current-user-albums'>
                {yourAlbums.map((album)=>{
                return (
                    <NavLink key={album.id} to={`/albums/${album.id}`}>
                        <div className='img-box'>
                          <img className='album-content-entry-image' src={album.previewImage} />
                        </div>

                        <div className='content-entry' key={album.id}>
                            <div className='content-title'>{album.title}</div>
                            <div className='content-text'>{sessionUser.username}</div>
                        </div>
                    </NavLink>
                )
                })}
                {/* <div className='upload-album-button'>

                  <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/>
                </div> */}
          </div>
        </>
  )



}

export default CurrentUserAlbums;
