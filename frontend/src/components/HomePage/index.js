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
import './homepage.css'


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








    return (
        <div className='mainpage-container'>
            <div className='top-box'>
                {/* <img src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg' /> */}
                <div className='banner-text'>

                <h2>What's next in music is first on SoundCloud</h2>
                <p>Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans, and connect with other artists.</p>
                </div>
            </div>
            <div className='mid-box'>
                <h2>Hear what's trending for free in the SoundCloud community</h2>
                <div className='song-trending'>
                    {isLoaded && copyList() &&
                        songShows.map((song, index)=>{
                            return (
                                <div className='song-list-container'>
                                        <img className='song-entry-image' src={song.previewImage} />
                                    <div className='song-content'>
                                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                                        <span className='song-title'>{song.title}</span>
                                        <span className='song-text'>Top 50</span>
                                    </NavLink>
                                    </div>


                            </div>
                        )})}
                </div>
                        <div className='explore-bar'>
                            <NavLink to='/songs'>Explore All Songs</NavLink>
                        </div>

            </div>

            <div className='bottom-box'>

            </div>

            <div className='foot-box'>

            </div>



</div>
                )




    }



export default HomePage;
