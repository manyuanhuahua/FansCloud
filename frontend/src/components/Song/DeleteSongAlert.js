import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as songActions from '../../store/song'

const DeleteSongAlert = ({albumId,song,hideModal})=>{
    const history=useHistory()
    const dispatch = useDispatch()


    const [errors, setErrors] = useState([]);



    const songId = song.id



    const handleDeleteClick = async (e) => {
      e.preventDefault();

      hideModal()

        return dispatch(songActions.deleteSong(songId, albumId))
                  .then(()=>history.push(`/albums/${albumId}`))
      };


      const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

      return  (
       <form>
          <div className='delete-song-form'>
            <h2>Delete Song</h2>

          <p>Are you sure you want to delete {song.title}? This action cannot be undone.</p>
          <div className='button-group'>

          <button type="button" onClick={handleCancelClick} >Cancel</button>
          <button type="button" onClick={handleDeleteClick} style={{background:'#f50',color:'#fff'}}>Delete</button>
          </div>
          </div>
       </form>

      )


}

export default DeleteSongAlert;
