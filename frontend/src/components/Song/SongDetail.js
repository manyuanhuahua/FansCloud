import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import MainAudioPlayer from '../AudioPlayer/MainAudio';
import DeleteSong from './DeleteSongAlert';
import DeleteSongModal from './DeleteSongModal';
import EditSongModal from './EditSongModal';


const SongDetail = ()=>{
    const dispatch = useDispatch()
    const {songId} = useParams()
    const song = useSelector(state => state.songs.song);
    const sessionUser = useSelector(state => state.session.user)




    ;

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("song", song)
    // console.log('songObj', Object.values(song))

      useEffect(()=>{
        dispatch(songActions.getSongDetail(songId))
                .then(()=>{
                    setIsLoaded(true)
        })
      },[dispatch,songId])




      return isLoaded && (

            <div className='detial-container'>

                <div className='detail-entry' key={song.id}>
                    <div className='detail-content'>
                        <h2 className='detial-title'>{song.title}</h2>
                        <h3 className='detail-text'>{song.Artist.username}</h3>
                    </div>
                    <div className='detail-image'>
                        <img src={song.previewImage} />
                    </div>
                    <div className='song-create-time'>
                    {(sessionUser.id === song.userId) ? (
                        <>
                            <EditSongModal song={song}/>
                            <DeleteSongModal song={song} albumId={song.albumId} user={sessionUser}/>
                        </>
                    ):<></>}

                    </div>
                    <div className='song-detail-player'>
                        <MainAudioPlayer song={song}/>
                    </div>
                </div>

            </div>

      )

}

export default SongDetail;
