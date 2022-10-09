import { useEffect, useState,useCallback,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./song.css"
import ListPlayer from '../AudioPlayer/ListPlayer';


const SongList = ({albumId,createModal})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const songList = useSelector(state => state.songs);


    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch,albumId,createModal])


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

                    </div>
                    <div className='songlist-audioPlayer' >
                        <ListPlayer audio={song.audioUrl}/>
                    </div>
            </div>
        )
    })}

</div>
      )


}

export default SongList;
