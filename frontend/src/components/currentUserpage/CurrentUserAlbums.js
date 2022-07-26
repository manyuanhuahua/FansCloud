import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
// import * as albumActions from '../../store/album'

const CurrentUserAlbums = ({albumList, isLoaded})=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false)

    const yourAlbums = albumList.filter((album)=> album.userId === sessionUser.id);

    // console.log('yourAlbums',yourAlbums)


      return isLoaded && (
        <div>
            {yourAlbums.map((album)=>{
            return (
                <NavLink key={album.id} to={`/albums/${album.id}`}>
                    <div className='content-entry' key={album.id}>
                        <div className='content-entry-image'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4q7aSdGz3Y2tqilrzNrgAQB4Iz6PAavqwPg&usqp=CAU' />
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
