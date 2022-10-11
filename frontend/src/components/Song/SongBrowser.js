import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as songActions from '../../store/song'

import "./song.css"

const SongsBrowser = ()=>{
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs);
    const songList = Object.values(songs)

    const [isLoaded, setIsLoaded] = useState(false)


      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

      const defaultImg = 'https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg'

      const imgError = (e) =>{
            e.target.src = defaultImg
      }

      return isLoaded && (
        <div className='main-container'>
            <div className='top-title'>
                    <h2>Discover Extrending Songs</h2>
            </div>
            <div className='top-container'>


                {songList.map((song)=>{
                return (

                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                    <img className='song-entry-image'
                    src={song.previewImage? song.previewImage : defaultImg}
                    style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                    onError={imgError}
                    />
                        <div className='song-entry' key={song.id}>
                            <div className='song-title'>{song.title}</div>
                            <div className='song-text'>Top 50</div>

                        </div>
                    </NavLink>

                )
                })}
        </div>
        </div>
      )


}

export default SongsBrowser;
