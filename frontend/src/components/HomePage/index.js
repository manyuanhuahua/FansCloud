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
    const songs = useSelector(state => state.songs);

    const [isLoaded, setIsLoaded] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const songList = Object.values(songs)


    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])



      const defaultImg = 'https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg'

      const imgError = (e) =>{
            e.target.src = defaultImg
      }
    return isLoaded && (
        <div className='mainpage-container'>
            <div className='top-box'>

                <div className='banner-text'>

                <h2>What's next in music is first on FansCloud</h2>
                <p>Upload your first track and begin your journey. FansCloud gives you space to create, find your fans, and connect with other artists.</p>
                </div>
            </div>
            <div className='mid-box'>
                <h2>Hear what's trending for free in the FansCloud community</h2>
                <div className='song-trending'>
                    {isLoaded &&
                        songList.filter((song,index)=>index <= 12).map((song, index)=>{
                            return (
                                <div className='song-list-container' key={index}>
                                    <NavLink to={`/songs/${song?.id}`} style={{textDecoration: 'none'}}>
                                        <img className='song-entry-image'
                                        src={song.previewImage? song.previewImage : defaultImg}
                                        style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                                        onError={imgError}
                                         />
                                    <div className='song-content' >
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

                        <span>FansCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</span>
                    </div>
                </div>
                <div className='box-mid'>
                    <div className='text'>
                        <h3>Calling all creators</h3>
                        <p>Get on FansCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>

                    </div>
                       

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
