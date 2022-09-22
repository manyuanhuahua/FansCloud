import { useEffect, useState,useCallback,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
// import MainAudioPlayer from '../AudioPlayer/MainAudio';
import * as songActions from '../../store/song'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./song.css"
import ListPlayer from '../AudioPlayer/ListPlayer';
// import Player from "react-wavy-audio";

const SongList = ({albumId,createModal})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const songList = useSelector(state => state.songs);
    const [isPlay, setIsPlay] = useState(false)
    const [currentSong, setCurrentSong] = useState("")

    // const songList=songs.filter((song)=>song.albumId === albumId);
    // console.log('songList', songs)
    const [position, setPosition] = useState(0);
    const [muted, setMuted] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handlePositionChange = (position) => { /* ... */ };
    const onReadyHandler = () => console.log('done loading!');



    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch,albumId,createModal])

    //   const setMainSong=(song)=>{
    //     setCurrentSong(song)
    //   }

    const wavesurferRef = useRef();

    const handleWSMount = useCallback((waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      // console.log("ref------",wavesurferRef)
      if (wavesurferRef.current) {
        // wavesurferRef.current.load(wavesurferRef.current.audioUrl);
      console.log("ref------",wavesurferRef.current.audioUrl)



      //   wavesurferRef.current.on("ready", () => {
      //     console.log("WaveSurfer is ready");
      //   });

      //   wavesurferRef.current.on("loading", (data) => {
      //     console.log("loading --> ", data);
      //   });

      //   if (window) {
      //     window.surferidze = wavesurferRef.current;
      //   }
      }
    }, []);


        const play = useCallback(() => {
            wavesurferRef.current.playPause();
        }, []);


      return isLoaded && (
        <div className='audioList-container'>
        {songList.filter((song)=>song.albumId === albumId)
            .map((song, index)=>{
        return (
            <div className='menu-song' key={song?.id} >
                    <div className='img-box'>

                        <img className='song-img' src={song.previewImage}/>
                    </div>
                    <div className='song-text'>

                    <span>{index+1}</span>

                        <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}</Link>
                        {/* <div onClick={()=>setIsPlay(!isPlay)}><i class="fa-solid fa-circle-play" id={index} /></div> */}
                    </div>


                    <div className='songlist-audioPlayer' >
                        {/* {console.log('song------',song)} */}
                        <ListPlayer audio={song?.audioUrl}/>
                    {/* <button onClick={play}>Play</button>  */}
                    {/* <AudioPlayer
                             autoPlay={false}
                            src={song.audioUrl}
                            layout='horizontal'
                            customAdditionalControls={[]}
                      /> */}
                    </div>

                    {/* <MainAudioPlayer song={song}/> */}
            </div>
        )
    })}

</div>
      )


}

export default SongList;
