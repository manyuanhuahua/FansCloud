import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'

const CurrentUserAlbums = ()=>{
    const dispatch = useDispatch()
    const albumsList = useSelector(state => state.albums.albums.filter((album)=> album.userId === sessionUser.id));
    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(songList.length)
    // console.log('songList', songList)

      useEffect(()=>{
        dispatch(albumActions.getalbums()).then(()=>setIsLoaded(true))
      },[dispatch])


      return isLoaded && (
            <div>
                {/* {console.log("return songList", songList)} */}
                {albumsList.map((album)=>{
                return (
                    <NavLink key={album.id} to={`/albums/${album.id}`}>
                        <div className='content-entry' key={album.id}>
                            <div className='content-entry-image'>
                                <img src='https://pub-static.fotor.com/assets/projects/pages/14d2718d0d83473080f686bf299011ba/purple-music-album-3c5ef7b7d3a340f094bd962272001520.jpg' />
                            </div>
                            <div className='content-title'>{album.title}</div>
                            <div className='content-text'>Top 50</div>
                        </div>
                    </NavLink>
                )
                })}
        </div>
      )


}

export default CurrentUserAlbums;
