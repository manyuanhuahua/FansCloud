import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'

const Explore = ()=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const [isLoaded, setIsLoaded] = useState(false)



    // console.log('currentUserSong', songList)

    useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

    // const [isLoaded, setIsLoaded] = useState(false)
    // console.log(songList.length)
    // console.log('currentUserSong', yourSongs)



      return isLoaded && (
            <div>
                {yourSongs.filter((song)=> song.userId === sessionUser.id)
                    .map((song)=>{
                return (
                    <NavLink key={song.id} to={`/songs/${song.id}`}>
                        <div className='content-entry' key={song.id}>
                            <div className='content-entry-image'>
                                <img src='https://pub-static.fotor.com/assets/projects/pages/14d2718d0d83473080f686bf299011ba/purple-music-album-3c5ef7b7d3a340f094bd962272001520.jpg' />
                            </div>
                            <div className='content-title'>{song.title}</div>
                            <div className='content-text'>Top 50</div>
                        </div>
                    </NavLink>
                )
                })}
        </div>
      )


}

export default Explore;
