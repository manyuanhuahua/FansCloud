import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormPage/SignupForm';
import * as songActions from '../../store/song'
import LoginForm from '../LoginFormModal/LoginForm';
import 'react-h5-audio-player/lib/styles.css';

import './homepage.css'



function HomePage(){
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs);
    const sessionUser = useSelector(state => state.session.user);
    const [isPlay, setIsPlay] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    return isLoaded && (
        <div className='mainpage-container'>
            <div className='top-box'>
                {/* <img src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg' /> */}
                <div className='banner-text'>

                <h2>What's next in music is first on FansCloud</h2>
                <p>Upload your first track and begin your journey. FansCloud gives you space to create, find your fans, and connect with other artists.</p>
                </div>
            </div>
            <div className='mid-box'>
                <h2>Hear what's trending for free in the FansCloud community</h2>
                <div className='song-trending'>
                    {isLoaded && copyList() &&
                        songShows.map((song, index)=>{
                            return (
                                <div className='song-list-container' key={index}>
                                    <NavLink to={`/songs/${song?.id}`}>
                                        <img className='song-entry-image' src={song?.previewImage} />
                                    <div className='song-content'>
                                        <span className='song-title'>{song?.title}</span>
                                        <span className='song-text'>Top 50</span>
                                    </div>
                                    </NavLink>


                            </div>
                        )})}
                </div>
                        <div className='explore-bar'>
                            <NavLink to='/songs'>Explore All Songs</NavLink>
                        </div>


            </div>

            <div className='bottom-box'>
                <div className='box-top'>
                    <div className='social-media'>
                        <img className='phone' src='https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg'/>
                    </div>
                    <div className='text'>
                        <h2>Never stop listening</h2>
                        {/* <img class='color' src='https://image.shutterstock.com/image-illustration/abstract-layout-wavy-lines-cmyk-260nw-62119561.jpg'/> */}
                        <span>FansCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</span>
                    </div>
                </div>
                <div className='box-mid'>
                    <div className='text'>
                        <h3>Calling all creators</h3>
                        <p>Get on FansCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>

                    </div>
                        {/* <img className='artist' src='https://a-v2.sndcdn.com/assets/images/hp_creator_image_featured_artists-798050ae.jpg'/> */}

                </div>
                <div className='box-bottom'>
                        <div className='bottom-signup'>

                        <h2>Thanks for listening. Now join in.</h2>
                        <h3>Save tracks, follow artists and build playlists. All for free.</h3>
                        <button className='signup-button-two' onClick={() => setShowSignUpModal(true)}>Create account</button>
                            {showSignUpModal && (
                                <Modal onClose={() => setShowSignUpModal(false)}>
                                <SignupForm />
                                </Modal>
                            )}
                        </div>
                        <div className='bottom-loging'>
                            <span>Already have an account? </span>
                            <button className='login-button-two' onClick={() => setShowLoginModal(true)}>Log In</button>
                                {showLoginModal && (
                                        <Modal onClose={() => setShowLoginModal(false)}>
                                        <LoginForm />
                                        </Modal>
                                )}
                        </div>
                </div>
            </div>

            <div className='foot-box' >
                <p>Javascript</p>
                <p>Express.js</p>
                <p>Node.js</p>
                <p>React</p>
                <p>SQLite3</p>
                <p>AWS</p>
                <p>CSS</p>
                <p>Heroku</p>



            </div>



</div>
                )




    }



export default HomePage;
