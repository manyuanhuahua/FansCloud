import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import MainAudioPlayer from '../AudioPlayer/MainAudio';
import * as songActions from '../../store/song'

const SongList = ({albumId})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const songList = useSelector(state => state.songs.songs);
    const [isPlay, setIsPlay] = useState(false)
    const [currentSong, setCurrentSong] = useState("")

    // const songList=songs.filter((song)=>song.albumId === albumId);
    // console.log('songList', songs)

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch,albumId])

      const setMainSong=(song)=>{
        setCurrentSong(song)
      }

      return isLoaded && (
        <div className='audioList-container'>
        {songList.filter((song)=>song.albumId === albumId)
            .map((song, index)=>{
        return (
            <div className='menu-song' key={song?.id}
            >
                <li className='songItem'>
                    <img src={song.previewImage}/>
                    <span>{index+1}</span>
                    <h5>
                        <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}-<span className='song-subtitle'>{sessionUser.username}</span></Link>

                        {/* <div onClick={()=>setIsPlay(!isPlay)}><i class="fa-solid fa-circle-play" id={index} /></div> */}
                    </h5>

                </li>

                <i className="fa-solid fa-circle-play" onClick={()=>setMainSong(song)}></i>

            </div>
        )
    })}
    <MainAudioPlayer song={currentSong}/>

</div>
      )


}

export default SongList;
