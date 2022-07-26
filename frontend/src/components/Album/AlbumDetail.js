import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as albumActions from '../../store/album'


const AlbumDetail = ()=>{
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const album = useSelector(state => state.albums.album);
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("song", song)
    // console.log('songObj', Object.values(song))

      useEffect(()=>{
        dispatch(albumActions.getAlbumDetail(albumId)).then(()=>setIsLoaded(true))
      },[dispatch,albumId])



      return isLoaded && (

            <div className='detial-container'>

                <div className='detail-entry' key={album.id}>
                    <div className='detail-content'>
                    <h2 className='detial-title'>{album.title}</h2>
                    <h3 className='detail-text'>{album.Artist.username}</h3>
                    </div>
                    <div className='detail-image'>
                        <img src='https://cdn.flipsnack.com/template/4465/small/page_1?v=1626961047' />
                    </div>
                    {/* <div className='song-create-time'>

                    </div> */}
                </div>

            </div>

      )

}

export default AlbumDetail;
