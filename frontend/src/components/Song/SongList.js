import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'

const SongList = ({songs,albumId})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    // const songList=songs.filter((song)=>song.albumId === albumId);
    // console.log('songList', songList)

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch,albumId])


      return isLoaded && (
        <div>
        {songs.filter((song)=>song.albumId === albumId)
            .map((song)=>{
        return (
            <div className='detial-container' key={song.id}>
                <div className='detail-entry' key={song.id}>
                    <div className='detail-content'>
                        <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}-{sessionUser.username}</Link>

                    </div>
                    <div className='detail-image'>
                        <img src='https://cdn.ywwpay.com/zb_users/upload/2022/07/20220706000744165703726471194.jpg' />
                    </div>
                    <div className='song-create-time'>

                    </div>
                </div>

            </div>
        )
        })}
</div>
      )


}

export default SongList;
