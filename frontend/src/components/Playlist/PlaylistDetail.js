import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import {getPlaylistDetailThunk} from '../../store/playlist'
import CreateSongModal from '../Song/CreateSongModal';
import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';





const PlaylistDetail = ()=>{
    const dispatch = useDispatch()
    const {playlistId} = useParams()
    const playlistObj = useSelector(state => state.playlists);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [currentTrack, setTrackIndex] = useState(0)

    const [isLoaded, setIsLoaded] = useState(false)
    const [songLoaded, setSongLoaded] = useState(false)


    useEffect(()=>{
        dispatch(getPlaylistDetailThunk(playlistId)).then(()=>setIsLoaded(true))
    },[dispatch,playlistId])

    const playlist = Object.values(playlistObj)[0]


    const handleClickNext = (songs) => {
        setTrackIndex((currentTrack) =>
            currentTrack < songs.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleEnd = (songs) => {
      setTrackIndex((currentTrack) =>
              currentTrack < songs.length - 1 ? currentTrack + 1 : 0
          );
    }

      return isLoaded && playlist &&(
            <div className='playlist-detail-main'>
                <div className='playlist-gallery-container'>
                    <div className='playlist-gallery-left-box'>
                        <div className='playlist-cover-img'>
                            <img className='playlist-selected-img' src={playlist.songs[currentTrack].previewImage} />
                        </div>
                        <div className='playlist-selected-song-content'>
                            <h4 >{playlist.songs[currentTrack].title}</h4>
                            <p>{playlist.user.username}</p>
                        </div>
                        <div className='playlist-detail-audio-player'>

                        <AudioPlayer className='playlist-audio-container'
                                volume="0.5"
                                src={playlist.songs[currentTrack].audioUrl}
                                showSkipControls
                                onClickNext={()=>{handleClickNext(playlist.songs)}}
                                onEnded={()=>handleEnd(playlist.songs)}
                                style={{height:'88px'}}
                                customAdditionalControls={
                                    [
                                    RHAP_UI.LOOP,
                                    ]
                                }
                                />
                        </div>
                    </div>
                    <div className='playlist-gallery-right'>

                        {playlist.songs?.map((song,index)=>{
                            return (
                                <div className='playlist-gallery-right-box'>

                                    <p>{index+1} - <span>{song.title}</span></p>
                                    <NavLink key={song.id} to={`/songs/${song.id}`} style={{textDecoration:'none',color:'#333'}}>
                                    <button>More info</button>
                                    </NavLink>
                                </div>
                            )
                        }
                        )
                        }
                    </div>

                </div>
            </div>


      )

}

export default PlaylistDetail;
