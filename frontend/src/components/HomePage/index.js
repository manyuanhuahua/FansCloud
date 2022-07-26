import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import * as songActions from '../../store/song'


function HomePage(){
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const sessionUser = useSelector(state => state.session.user);

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
        <>

        {isLoaded && copyList() &&
            songShows.map((song)=>{
                return (
                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                        <div className='song-entry' key={song.id}>
                            <div className='song-entry-image'>
                                <img src='https://pub-static.fotor.com/assets/projects/pages/14d2718d0d83473080f686bf299011ba/purple-music-album-3c5ef7b7d3a340f094bd962272001520.jpg' />
                            </div>
                            <div className='song-title'>{song.title}</div>
                            <div className='song-text'>Top 50</div>
                        </div>
                    </NavLink>
                )
            })}
        <NavLink to='/songs'>Explore All Songs</NavLink>
        {(!sessionUser) && (
            <div>
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        )}
        </>
    )

    }



export default HomePage;
