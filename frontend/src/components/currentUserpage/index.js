import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import CreateAlbumForm from '../Album/CreateAlbumForm';
import CurrentUserAlbums from './CurrentUserAlbums';
import CurrentUserSongs from './CurrentUserSongs';



const CurrentUser = ()=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const albumList = useSelector(state => state.albums.albums);

    const sessionUser = useSelector(state => state.session.user);
    const [showForm, setShowForm] = useState(false)
    const [showSongs, setShowSongs] = useState(false)
    const [showAlbums, setShowAlbums] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(songList.length)
    console.log('albumList', albumList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

      return  isLoaded && (
            <div>
                <p>this is current user page</p>
                <div className='you-nav-container'>
                    <nav>
                    <button className='user-nav' >Overview</button>
                    {"   "} {"   "}
                    <button className='user-nav' type='text' onClick={()=>setShowSongs(true)}>Songs</button>
                    {/* <CurrentUserAlbums /> */}
                    {"   "} {"   "}
                    <button className='user-nav' type='text' onClick={()=>setShowAlbums(true)}>Albums</button>
                    {"   "} {"   "}
                    <NavLink exact to="/current/comments">Comments</NavLink>
                    </nav>
                </div>
                {/* <button onClick={()=>createAlbum()}>create album</button> */}
                {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
                <div className='user-library-container'>
                    <div>
                        {showSongs && (<CurrentUserSongs songList={songList}/>)}
                        {showAlbums && (<CurrentUserAlbums />)}
                    </div>
                </div>


                {/* <button hidden={showForm} onClick={() => setShowForm(true)}>Upload</button>
                {showForm ?
                (
                    <CreateAlbumForm hideForm={() => setShowForm(false)}/>
                )
                :
                (<Route path="/currentUser" />)} */}

            </div>
      )


}

export default CurrentUser;
