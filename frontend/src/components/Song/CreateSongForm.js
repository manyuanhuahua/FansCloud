import React, { useState } from 'react';
import * as songActions from '../../store/song'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

function CreateSongForm({hideModal,albumId,createModal, setCreateModal}){
    const history = useHistory()
    const dispatch = useDispatch();
    // const albumId = useParams()
    const sessionUser = useSelector(state=>state.session.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioUrl, setaudioUrl] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);

    // const albumId = album.id
    // const [showForm, setShowForm] = useState(true)



    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);
      hideModal()
        const newSong = {
            title,
            description,
            audioUrl,
            previewImage
        }
        return dispatch(songActions.createSong(albumId,newSong)).catch(
          async (res) => {
               const data  = await res.json();

            // const data  = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })


      };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };





    return (
        // <section className="new-form-holder centered middled">
          <form className="create-song-form" onSubmit={handleSubmit}>
            <div className='form-content'>

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
              placeholder="Audio Url(mp3)"
              required
              value={audioUrl}
              onChange={(e)=>setaudioUrl(e.target.value)} />
            <input
              type="text"
              placeholder="Song profile image"
              value={previewImage}
              onChange={(e)=>setPreviewImage(e.target.value)} />
            </div>
            <ul>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
          <button id='upload-song-button-click' type="submit" onClick={()=>setCreateModal(!createModal)}>Create New Song</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      // </section>
      );
}

export default CreateSongForm;
