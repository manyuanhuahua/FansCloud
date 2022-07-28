import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'
import * as songActions from '../../store/song'
import SongList from '../Song/SongList';
import EditAlbumModal from './EditAlbumModal';
import CreateSongModal from '../Song/CreateSongModal';
import DeleteAlbumModal from './DeleteAlbumModal';


const AlbumDetail = ()=>{
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const album = useSelector(state => state.albums.album);
    const songList = useSelector(state => state.songs.songs);

    // const yourSongs = useSelector(state => state.songs.songs.filter((song)=> song.albumId === albumId));


    // console.log("songList", yourSongs)
    // const albumSongs= album.Songs;

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        dispatch(albumActions.getAlbumDetail(albumId)).then(()=>setIsLoaded(true))
    },[dispatch,albumId])

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
    },[dispatch])
    // const  = album.Songs

    // console.log("albumSong", albumSongs)
    // console.log('album', album)




      return isLoaded && (
            //top banner
            <div className='album-top-banner'>
                <img src='https://scpic.chinaz.net/files/pic/pic9/202103/hpic3749.jpg' alt='' className='album-banner-background-img'></img>
                <div className='banner-content'>
                    <div className='detail-left-top' key={album.id}>
                        <div className='top-content'>
                            <span className='detial-title'>{album.title}</span>
                            <span className='detail-creator'><Link to="/currentUser">{album.Artist.username}</Link></span>
                        </div>
                    </div>
                    <div className='detail-left-bottom'>
                        <h6>{album.id}</h6>
                        <span>track</span>
                    </div>
                </div>
                <div className='detail-right'>
                    <img src={album.previewImage}/>
                </div>
            <div className='album-mid-nav'>

                     <EditAlbumModal album={album}/>


                     <DeleteAlbumModal album={album}/>
                     <CreateSongModal albumId={album.id}/>

            </div>

            <div className='album-main-container'>
                <div className='profie-box'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU'></img>
                    <span>{album.Artist.username}</span>
                </div>
                <div className='songsContainer'>
                    <SongList songs={songList} albumId={album.id}/>

                </div>
            </div>
                 <div>
                 </div>

            </div>

      )

}

export default AlbumDetail;
