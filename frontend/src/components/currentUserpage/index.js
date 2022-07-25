import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import CreateSongForm from '../Album/CreateSongForm';
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
                {/* <button onClick={()=>createAlbum()}>create album</button> */}
                {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
                <button hidden={showForm} onClick={() => setShowForm(true)}>Upload</button>
                {showForm ?
                (<CreateSongForm />)
                :
                (<Route path="/currentUser" />)}

            </div>
      )


}

export default CurrentUser;
