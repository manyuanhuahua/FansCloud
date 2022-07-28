import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import * as albumActions from '../../store/album'
import UploadBotton from './UploadButton';
import ProfileButton from './ProfileButton';
import CreateAlbumForm from '../Album/CreateAlbumForm';
import CurrentUserAlbums from './CurrentUserAlbums';
import CurrentUserSongs from './CurrentUserSongs';



const CurrentUser = ({showAlbums, showSongs})=>{
    const dispatch = useDispatch()
    const songList = useSelector(state => state.songs.songs);
    const albumList = useSelector(state => state.albums.albums);

    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(songList.length)
    // console.log('albumListcurrentUser', albumList)

      useEffect(()=>{
        dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
      },[dispatch])

      useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch])

    // const createAlbum = () =>{
    //     dispatch(createAlbum())
    // }

      return  isLoaded && (sessionUser && Object.keys(sessionUser).length >0) && (

        <>

                <p>this is current user page</p>


                <div className='user-library-container'>
                    <div>
                        {showSongs && (<CurrentUserSongs songList={songList} isLoaded={isLoaded}/>)}
                        {showAlbums && (<CurrentUserAlbums albumList={albumList} isLoaded={isLoaded}/>)}
                    </div>
                </div>
      </>


            

      )


}

export default CurrentUser;
