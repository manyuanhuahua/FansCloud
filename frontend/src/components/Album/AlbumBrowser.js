import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'
import SongList from '../Song/SongList';

const AlbumsBrowser = ()=>{
    const dispatch = useDispatch()
    const albumList = useSelector(state => state.albums.albums);
    const songList = useSelector(state => state.songs.songs);

    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(songList.length)
    // console.log('songList', songList)

    useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch])


      return isLoaded && (
            <div>
                {/* {console.log("return songList", songList)} */}
                {albumList.map((album)=>{
                return (
                    <NavLink key={album.id} to={`/albums/${album.id}`}>
                        <div className='song-entry' key={album.id}>
                            <div className='song-entry-image'>
                                <img src='https://pub-static.fotor.com/assets/projects/pages/14d2718d0d83473080f686bf299011ba/purple-music-album-3c5ef7b7d3a340f094bd962272001520.jpg' />
                            </div>
                            <div className='song-title'>{album.title}</div>
                            <div className='song-text'>Top 50</div>
                        </div>
                    </NavLink>
                )
                })}
        </div>
      )


}

export default AlbumsBrowser;
