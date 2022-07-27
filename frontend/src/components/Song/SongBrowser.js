import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import SongList from './SongList';

const SongsBrowser = ()=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(songList.length)
    // console.log('songList', songList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])


      return isLoaded && (
            <div>
                {/* {console.log("return songList", songList)} */}
                {songList.map((song)=>{
                return (
                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                        <div className='song-entry' key={song.id}>
                            <div className='song-entry-image'>
                                <img src={song.previewImage} />
                            </div>
                            <div className='song-title'>{song.title}</div>
                            <div className='song-text'>Top 50</div>
                            <SongList songs={songList}/>
                        </div>
                    </NavLink>
                )
                })}
        </div>
      )


}

export default SongsBrowser;
