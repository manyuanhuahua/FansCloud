import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'

const CurrentUser = ()=>{
    const dispatch = useDispatch()
    // const songList = useSelector(state => state.songs.songs);
    const [showForm, setShowForm] = useState(false)
    // console.log(songList.length)
    // console.log('songList', songList)

    //   useEffect(()=>{
    //     dispatch(songActions.getSong()).then(()=>setIsLoaded(true))
    //   },[dispatch])

    const createAlbum = () =>{
        dispatch(createAlbum())
    }

      return  (
            <div>
                <p>this is current user page</p>
                <button onClick={()=>createAlbum()}>create album</button>
            </div>
      )


}

export default CurrentUser;
