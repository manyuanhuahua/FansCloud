import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {deletePlaylistThunk} from '../../store/playlist'

const DeletePlaylistAlert = ({playlist,hideModal})=>{
    const history=useHistory()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([]);



    const handleDeleteClick = async (e) => {
      e.preventDefault();

        hideModal()

        return dispatch(deletePlaylistThunk(playlist.id))
        .then(
            async (res) => {
                if (res.errors) {
                    setErrors(res.errors)
                }
                else {
                    hideModal()

                    history.push('/playlists');
                }

            })

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
