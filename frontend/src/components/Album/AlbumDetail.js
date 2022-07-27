import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
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

            <div className='detial-container'>

                 <div className='detail-entry' key={album.id}>
                     <div className='detail-content'>
                     <h2 className='detial-title'>{album.title}</h2>
                     <h3 className='detail-text'>{album.Artist.username}</h3>
                     </div>
                     <div className='detail-image'>
                         <img src={album.previewImage} />
                     </div>

                </div>
                 <div>


                     <EditAlbumModal album={album}/>

                     <DeleteAlbumModal album={album}/>
                     <CreateSongModal albumId={album.id}/>
                 </div>
                 <div>
                 <SongList songs={songList} albumId={album.id}/>
                 </div>

            </div>

      )

}

export default AlbumDetail;
