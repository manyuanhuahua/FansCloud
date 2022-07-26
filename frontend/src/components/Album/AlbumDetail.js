import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'

const SongDetail = ()=>{
    const dispatch = useDispatch()
    const {songId} = useParams()
    const song = useSelector(state => state.songs.song);
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("song", song)
    // console.log('songObj', Object.values(song))

      useEffect(()=>{
        dispatch(songActions.getSongDetail(songId)).then(()=>setIsLoaded(true))
      },[dispatch,songId])



      return isLoaded && (

            <div className='song-detial-block'>

                <div className='song-entry' key={song.id}>
                    <h2 className='song-title'>{song.title}</h2>
                    <h3 className='song-text'>{song.Artist.username}</h3>
                    <div className='song-entry-image'>
                        <img src='https://cdn.ywwpay.com/zb_users/upload/2022/07/20220706000744165703726471194.jpg' />
                    </div>
                    <div className='song-create-time'>

                    </div>
                </div>

            </div>

      )

}

export default SongDetail;
