import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'
// import * as albumActions from '../../store/album'

const CurrentUserAlbums = ()=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)
    const yourAlbums = useSelector(state => state.albums.albums);

    // const yourAlbums = albumList.filter((album)=> album.userId === sessionUser.id);

    useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch])
    // console.log('yourAlbums',yourAlbums)


      return isLoaded && (
        <div>
            {yourAlbums.filter((album)=> album.userId === sessionUser.id)
                      .map((album)=>{
            return (
                <NavLink key={album.id} to={`/albums/${album.id}`}>
                    <div className='content-entry' key={album.id}>
                        <div className='content-entry-image'>
                            <img src={album.previewImage} />
                        </div>
                        <div className='content-title'>{album.title}</div>
                        <div className='content-text'>{sessionUser.username}</div>
                    </div>
                </NavLink>
            )
            })}
    </div>
  )



}

export default CurrentUserAlbums;
