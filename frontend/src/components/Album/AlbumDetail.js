import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'
import * as songActions from '../../store/song'
import SongList from '../Song/SongList';
import EditAlbumModal from './EditAlbumModal';
import CreateSongModal from '../Song/CreateSongModal';
import DeleteAlbumModal from './DeleteAlbumModal';
import "./album.css"

const AlbumDetail = ()=>{
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const album = useSelector(state => state.albums);
    const songList = useSelector(state => state.songs);
    const sessionUser = useSelector(state => state.session.user);

    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);



    const [isLoaded, setIsLoaded] = useState(false)
    const [songLoaded, setSongLoaded] = useState(false)


    useEffect(()=>{
        dispatch(albumActions.getAlbumDetail(albumId)).then(()=>setIsLoaded(true))
    },[dispatch,albumId,editModal])

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setSongLoaded(true))
    },[dispatch,createModal])


    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'
    const albumDefault = 'https://i.pinimg.com/236x/8a/b8/7b/8ab87bd6999d659eb282fbed00895d86--last-fm-album-cover.jpg'
    const imgError = (e) =>{
          e.target.src = defaultImg
    }


      return isLoaded && songLoaded && (
            //top banner
            <div className='album-detail'>
                <div className='album-top-box'>
                    <div className='top-box-left'>
                            <div className='left-top'>
                                <div className='img-cropper'>
                                    <img className='player-img' alt=''
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-DWToqLKUNiKibSfOoTx8UrBcM9CVJ8gag&usqp=CAU' />
                                </div>
                                <div className='text'>
                                    <span className='detial-title'>{album?.title}</span>
                                    <span className='detail-creator' style={{width:'300px',wordWrap:'break-word'}}><Link to="/currentUser">{album.description}</Link></span>
                                </div>

                            </div>
                    </div>
                    <div className='top-box-right'>
                            <img className='album-cover'
                            alt=''
                            src={album.previewImage? album.previewImage : albumDefault}
                            onError={(e) => e.target.src = albumDefault}
                            />
                    </div>

                </div>
                {(sessionUser.id === album.userId) ?(
                    <div className='mid-box'>

                     <EditAlbumModal album={album} editModal={editModal} setEditModal={setEditModal}/>
                        <span>Edit Album</span>
                     <DeleteAlbumModal album={album} />
                     <span>Delete Album</span>

                     <CreateSongModal albumId={album.id} createModal={createModal} setCreateModal={setCreateModal}/>
                     <span>Add Songs</span>

                    </div>):(<></>)}

                <div className='content-container'>
                    <div className='center-box'>

                    <div className='content-left'>

                        <img className="user-profile"
                            alt=""
                            src={sessionUser.previewImage? sessionUser.previewImage : defaultImg}
                            style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                            onError={imgError}
                            />
                        <span>{album?.Artist.username}</span>

                    </div>
                     <div className='songsContainer'>
                        <SongList songs={songList} albumId={album.id} createModal={createModal}/>

                    </div>
                    </div>
                </div>
                 <div>
                 </div>

            </div>

      )

}

export default AlbumDetail;
