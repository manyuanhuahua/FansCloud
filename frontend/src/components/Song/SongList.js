import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
// import MainAudioPlayer from '../AudioPlayer/MainAudio';
import * as songActions from '../../store/song'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./song.css"

const SongList = ({albumId,createModal})=>{
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
      },[dispatch,albumId,createModal])

    //   const setMainSong=(song)=>{
    //     setCurrentSong(song)
    //   }

      return isLoaded && (
        <div className='audioList-container'>
        {songList.filter((song)=>song.albumId === albumId)
            .map((song, index)=>{
        return (
            <div className='menu-song' key={song?.id}>
                    <div className='img-box'>

                        <img className='song-img' src={song.previewImage}/>
                    </div>
                    <div className='song-text'>

                    <span>{index+1}</span>

                        <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}-<span className='song-subtitle'>{sessionUser?.username}</span></Link>
                        {/* <div onClick={()=>setIsPlay(!isPlay)}><i class="fa-solid fa-circle-play" id={index} /></div> */}
                    </div>


                    <div className='songlist-audioPlayer'>
                    <AudioPlayer
                             autoPlay={false}
                            src={song.audioUrl}
                            layout='horizontal'
                            customAdditionalControls={[]}
                      />
                    </div>

                    {/* <MainAudioPlayer song={song}/> */}
            </div>
        )
    })}

</div>
      )


}

export default SongList;
