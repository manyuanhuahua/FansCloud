import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import SongList from './SongList';
import "./song.css"

const SongsBrowser = ()=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs);
    const [isLoaded, setIsLoaded] = useState(false)
 

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])


      return isLoaded && (
        <div className='main-container'>
            <div className='top-title'>
                    <h2>Discover Extrending Songs</h2>
            </div>
            <div className='top-container'>


                {songList.map((song)=>{
                return (
                // <div className='song-content'>
                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                    <img className='song-entry-image' src={song.previewImage} />
                        <div className='song-entry' key={song.id}>
                            <div className='song-title'>{song.title}</div>
                            <div className='song-text'>Top 50</div>
                            {/* <SongList songs={songList}/> */}
                        </div>
                    </NavLink>
                    // </div>
                )
                })}
        </div>
        {/* <div className='mid-container'>

        </div>
        <div className='mid-container'>

        </div> */}
        </div>
      )


}

export default SongsBrowser;
