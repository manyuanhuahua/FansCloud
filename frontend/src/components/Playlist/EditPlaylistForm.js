import React, { useState } from 'react';
import {editPlaylistThunk} from '../../store/playlist'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

function EditPlaylistForm({playlist, hideModal,editModal,setEditModal}){
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [name, setName] = useState(playlist.name);
    const [previewImage, setPreviewImage] = useState(playlist.previewImage);
    const [errors, setErrors] = useState([]);





    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);

        const updatePlaylist = {
            ...playlist,
            name,
            previewImage
        }

      dispatch(editPlaylistThunk(updatePlaylist)).then(
        async (res) => {
          if (res.errors) {
              setErrors(res.errors)
          }
          else {


              hideModal()

              history.push(`/playlists`);
          }

      })

          // .then(()=>history.push(`/currentUser`));

        // if(updaedAlbum){
        //     hideModal()
        // }
          };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors({});
        hideModal()
      };





    return (
        <section className="new-form-holder centered middled">
        <form className="create-album-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
          </ul>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          <input
            type="text"
            placeholder="Playlist profile image"
            value={previewImage}
            required
            onChange={(e)=>setPreviewImage(e.target.value)} />

          <button id='edit-album-button' type="submit" onClick={handleSubmit}>Update Playlist</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      </section>
      );
}

export default EditPlaylistForm;
