import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'

const DeleteSongAlert = ({albumId,song,hideModal,user})=>{
    const history=useHistory()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([]);

    // const songList=songs.filter((song)=>song.albumId === albumId);

    const songId = song.id

    console.log('song', song.id)
    console.log('user', user)

    const handleDeleteClick = async (e) => {
      e.preventDefault();


      hideModal()

        // setErrors([]);

        return dispatch(songActions.deleteSong(songId, albumId))
                  .then(()=>history.push('/currentUser'))
        //       .catch(async (res) => {
        //        const data  = await res.json();

        //     // const data  = await res.json();
        //     if (data && data.errors) setErrors(data.errors);

        // })





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


          {/* {errors && (
            <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
          </ul>
          )} */}
          <p>Are you sure you want to delete {song.title}? This action cannot be undone.</p>
          <div className='button-group'>

          <button type="button" onClick={handleCancelClick} >Cancel</button>
          <button type="button" onClick={handleDeleteClick}>Delete</button>
          </div>
          </div>
       </form>

      )


}

export default DeleteSongAlert;
