import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import {deletePlaylistThunk} from '../../store/playlist'

const DeletePlaylistAlert = ({playlist,hideModal})=>{
    const history=useHistory()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([]);

    // const songList=songs.filter((song)=>song.albumId === albumId);

    // const songId = song.id

    // console.log('song', song.id)
    // console.log('user', user)

    const handleDeleteClick = async (e) => {
      e.preventDefault();


        hideModal()

        // setErrors([]);

        return dispatch(deletePlaylistThunk(playlist.id))
                  .then(()=>history.push('/playlists'))

      };


      const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

      return  (
       <form>
          <div className='delete-album-form'>
            <h2>Delete Playlist</h2>
          {/* {errors && (
            <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
          </ul>
          )} */}
            <p>Are you sure you want to delete {playlist.name}? This action cannot be undone.</p>
            <div className='button-group'>
              <button type="button" onClick={handleCancelClick} >Cancel</button>
              <button type="button" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>

       </form>

      )


}

export default DeletePlaylistAlert;
