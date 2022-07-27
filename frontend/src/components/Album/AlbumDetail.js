import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'
import * as songActions from '../../store/song'
import SongList from '../Song/SongList';
import EditAlbumModal from './EditAlbumModal';


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

    const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
    const [showAddSongForm, setShowAddSongForm] = useState(false);


    // console.log("albumSong", albumSongs)
    // console.log('album', album)




      return isLoaded && (

            <div className='detial-container'>

                 <div className='detail-entry' key={album.id}>
                     <div className='detail-content'>
                     <h2 className='detial-title'>{album.title}</h2>
                     <h3 className='detail-text'>{album.Artist.username}</h3>
                     </div>
                     <div className='detail-image'>
                         <img src='https://cdn.flipsnack.com/template/4465/small/page_1?v=1626961047' />
                     </div>

                </div>
                 <div>


                     <EditAlbumModal album={album}/>
                     <button>Delete Album</button>


                 </div>
                 <div>
                 <SongList songs={songList} albumId={album.id}/>
                 </div>

            </div>

      )

}

export default AlbumDetail;
