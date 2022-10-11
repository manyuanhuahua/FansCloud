import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as songActions from '../../store/song'
import AudioPlayer  from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import "./song.css"



const SongList = ({albumId,createModal})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const songs= useSelector(state => state.songs);
    const songList = Object.values(songs)

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch,albumId,createModal])



      const defaultImg = 'https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

      return isLoaded && (
        <div className='audioList-container'>
        {songList.filter((song)=>song.albumId === albumId)
            .map((song, index)=>{
        return (
            <div className='menu-song' key={song?.id} >
                    <div className='img-box'>

                        <img className='song-img'
                        src={song.previewImage? song.previewImage : defaultImg}
                        style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                        onError={imgError}
                        />
                    </div>
                    <div className='song-text'>

                    <span>{index+1}</span>

                        <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}</Link>

                    </div>
                    <div className='songlist-audioPlayer' >

                    <AudioPlayer className='playlist-audio-container'
                        volume="0.5"
                        src={song.audioUrl}
                        showSkipControls={false}
                        style={{height:'50px',boxShadow:'none'}}
                        layout="horizontal-reverse"
                        customAdditionalControls={[]}
                        />
                    </div>
            </div>
        )
    })}

</div>
      )


}

export default SongList;
