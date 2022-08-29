import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as playlistActions from '../../store/playlist'
import SongList from '../Song/SongList';

const PlaylistLists = ()=>{
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists);
    const songList = useSelector(state => state.songs);

    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(songList.length)
    // console.log('songList', songList)

    useEffect(()=>{
        dispatch(playlistActions.getPlaylistsThunk()).then(()=>setIsLoaded(true))
      },[dispatch])


      return isLoaded && (
            <div className='playlistsList-main-container'>
                {Object.values(playlists).map((playlist)=>{
                    return (
                        <div>
                            <img src={playlist.previewImage} />
                            <div>{playlist.name}</div>
                        </div>
                    )
                })}
            </div>
      )
    }
export default PlaylistLists;
