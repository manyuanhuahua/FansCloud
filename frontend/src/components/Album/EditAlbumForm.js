import React, { useState } from 'react';
import * as albumActions from '../../store/album'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./album.css"
function EditAlbumForm({album, hideModal}){
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [previewImage, setPreviewImage] = useState(album.previewImage);
    const [errors, setErrors] = useState([]);



    // console.log("outside submit")

    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);
      hideModal()
        const updateAlbum = {
            ...album,
            title,
            description,
            previewImage
        }

        return dispatch(albumActions.editAlbum(updateAlbum)).catch(
              async (res) => {
            // console.log("in the catch")

              const data  = await res.json();

            // console.log("data.error", data.errors)

              if (data && data.errors) setErrors(data.errors);

          }
          ).then(()=>history.push(`/currentUser`));

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
            placeholder="Title"
            required
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e)=>setDescription(e.target.value)} />
          <input
            type="text"
            placeholder="Album profile image"
            value={previewImage}
            onChange={(e)=>setPreviewImage(e.target.value)} />

          <button id='edit-album-button' type="submit">Upload Album</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      </section>
      );
}

export default EditAlbumForm;
