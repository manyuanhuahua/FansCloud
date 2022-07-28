import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import * as songActions from '../../store/song'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MainAudioPlayer from '../AudioPlayer/MainAudio';
import ToggleButton from '../AudioPlayer/ToggleButton';


function HomePage(){
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const sessionUser = useSelector(state => state.session.user);
    const [isPlay, setIsPlay] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)

    let songShows= [];
    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

      const copyList = ()=>{
        for (let i = 0; i<12;i++){
            songShows.push(songList[i])
            }
        return songShows
      }





                    {/* <NavLink to='/signup'>Create account</NavLink> */}


    return (



        <div className='song-trending'>

        {isLoaded && copyList() &&
            songShows.map((song, index)=>{
                return (
                    <div className='song-list-container'>
                        <li className='songItem' key={index}>

                            <NavLink key={song.id} to={`/songs/${song.id}`}>
                            <div className='song-playlist'>
                                <span className='song-title'>{song.title}</span>
                                <span className='song-text'>Top 50</span>
                            </div>
                            <div className='song-entry-image'>
                                <img src={song.previewImage} />
                            </div>
                    </NavLink>
                    </li>

                    </div>

                )
            })}
        <NavLink to='/songs'>Explore All Songs</NavLink>
        {/* {(!sessionUser) && (
            <div>
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        )} */}
        {/* <ToggleButton /> */}
        </div>
    )

    }



export default HomePage;
