import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as albumActions from '../../store/album'

const DeleteAlbumAlert = ({album,hideModal})=>{
    const history=useHistory()
    const dispatch = useDispatch()


    const [errors, setErrors] = useState([]);



    const handleDeleteClick = async (e) => {
      e.preventDefault();


        hideModal()



        return dispatch(albumActions.deleteAlbum(album.id))
                  .then(()=>history.push('/currentUser'))

      };


      const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

      return  (
       <form>
          <div className='delete-album-form'>
            <h2>Delete Album</h2>
            <p>Are you sure you want to delete {album.title}? This action cannot be undone.</p>
            <div className='button-group'>
              <button type="button" onClick={handleCancelClick} >Cancel</button>
              <button type="button" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>

       </form>

      )


}

export default DeleteAlbumAlert;
