import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getYourALbumsThunk} from '../../store/album'
import { Modal } from '../../context/Modal';
import CreateAlbumForm from '../Album/CreateAlbumForm';
import "./currentUser.css"
const CurrentUserAlbums = ()=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)
    const yourAlbumsObj = useSelector(state => state.albums);
    const yourAlbums = Object.values(yourAlbumsObj);
    const [isUpload,setIsUpload] = useState(false)
  const [showModal, setShowModal] = useState(false);


    // const [isUpload, setIsUpload] = useState(false)


    // const yourAlbums = albumList.filter((album)=> album.userId === sessionUser.id);

    useEffect(()=>{
        dispatch(getYourALbumsThunk()).then(()=>setIsLoaded(true))
      },[dispatch,isUpload])
    // console.log('yourAlbums',yourAlbums)
    const albumDefault = 'https://i.pinimg.com/236x/8a/b8/7b/8ab87bd6999d659eb282fbed00895d86--last-fm-album-cover.jpg'

      return isLoaded && (

          <div className='user-page-main-container'>
              <div className='left-box'>
                  <h2 style={{marginRight:'30px'}}>My Album List</h2>
                  <div className='upload-album-button'>
                  <button onClick={() => setShowModal(true)}>Upload</button>
                      {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                          <CreateAlbumForm hideModal={()=>setShowModal(false)} isUpload={isUpload}  setIsUpload={setIsUpload}/>
                        </Modal>
                      )}
                  {/* <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/> */}
                  </div>
          </div>
          <div className='right-box'>
            <div className='current-user-albums'>
                {yourAlbums.map((album)=>{
                return (
                    <NavLink key={album.id} to={`/albums/${album.id}`}>
                        <div className='img-box'>
                          <img className='album-content-entry-image'
                          src={album.previewImage? album.previewImage : albumDefault}
                          onError={(e) => e.target.src = albumDefault}
                          />
                        </div>

                        <div className='content-entry' key={album.id}>
                            <div className='content-title'>{album.title}</div>
                            {/* <div className='content-text'>{sessionUser.username}</div> */}
                        </div>
                    </NavLink>
                )
                })}
                {/* <div className='upload-album-button'>

                  <UploadBotton isUpload={isUpload} setIsUpload={setIsUpload}/>
                </div> */}
          </div>
          </div>
        </div>
  )



}

export default CurrentUserAlbums;
