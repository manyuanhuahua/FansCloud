import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
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
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    // const yourSongs = useSelector(state => state.songs.songs.filter((song)=> song.albumId === albumId));


    // console.log("songList", yourSongs)
    // const albumSongs= album.Songs;

    const [isLoaded, setIsLoaded] = useState(false)
    const [songLoaded, setSongLoaded] = useState(false)


    useEffect(()=>{
        dispatch(albumActions.getAlbumDetail(albumId)).then(()=>setIsLoaded(true))
    },[dispatch,albumId,editModal])

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setSongLoaded(true))
    },[dispatch,createModal])
    // const  = album.Songs

    // console.log("albumSong", albumSongs)
    // console.log('album', album)




      return isLoaded && setSongLoaded && (
            //top banner
            <div className='album-detail'>
                <div className='album-top-box'>
                    <div className='top-box-left'>
                            <div className='left-top'>
                                <div className='img-cropper'>
                                    <img className='player-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-DWToqLKUNiKibSfOoTx8UrBcM9CVJ8gag&usqp=CAU' />
                                </div>
                                <div className='text'>
                                    <span className='detial-title'>{album?.title}</span>
                                    <span className='detail-creator'><Link to="/currentUser">{album?.Artist.username}</Link></span>
                                </div>

                            </div>
                    </div>
                    <div className='top-box-right'>
                            <img className='album-cover' src={album?.previewImage}/>
                    </div>

                </div>

                <div className='mid-box'>

                     <EditAlbumModal album={album} editModal={editModal} setEditModal={setEditModal}/>
                        <span>Edit Album</span>
                     <DeleteAlbumModal album={album} />
                     <span>Delete Album</span>

                     <CreateSongModal albumId={album.id} createModal={createModal} setCreateModal={setCreateModal}/>
                     <span>Add Songs</span>

                </div>

                <div className='content-container'>
                    <div className='center-box'>

                    <div className='content-left'>
                        <img className='user-profile' src='https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Corgi-Hero-1200x628.png'></img>
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
