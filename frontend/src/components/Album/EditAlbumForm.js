import React, { useState } from 'react';
import * as albumActions from '../../store/album'
import { useDispatch } from 'react-redux';
import "./album.css"
function EditAlbumForm({album, hideModal,editModal,setEditModal}){

    const dispatch = useDispatch();

    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [previewImage, setPreviewImage] = useState(album.previewImage);
    const [errors, setErrors] = useState([]);





    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);

        const updateAlbum = {
            ...album,
            title,
            description,
            previewImage
        }

      dispatch(albumActions.editAlbum(updateAlbum)).then(()=>hideModal()).catch(
              async (res) => {

              const data  = await res.json();

              if (data && data.errors) setErrors(data.errors);

          }
          )

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
            required
            onChange={(e)=>setPreviewImage(e.target.value)} />

          <button id='edit-album-button' type="submit" onClick={()=>setEditModal(!editModal)}>Upload Album</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      </section>
      );
}

export default EditAlbumForm;
