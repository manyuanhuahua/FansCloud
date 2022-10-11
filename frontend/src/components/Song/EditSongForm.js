import React, { useState } from 'react';
import * as songActions from '../../store/song'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./song.css"
function EditSongForm({song, hideModal}){

    const {songId} = useParams()
    const dispatch = useDispatch();

    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [audioUrl, setaudioUrl] = useState(song.audioUrl);
    const [previewImage, setPreviewImage] = useState(song.previewImage);
    const [errors, setErrors] = useState([]);






    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);

        const updateSong = {
            ...song,
            title,
            description,
            audioUrl,
            previewImage
        }

        dispatch(songActions.editSong(updateSong, songId)).then(()=>hideModal())
                .catch(async (res) => {
                    const data  = await res.json();

              if (data && data.errors) setErrors(data.errors);
          })
        }


    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors({});
        hideModal()
      };





    return (
       
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
            placeholder="Audio Url"
            required
            value={audioUrl}
            readOnly />
          <input
            type="text"
            placeholder="Song profile image"
            value={previewImage}
            onChange={(e)=>setPreviewImage(e.target.value)} />
          </div>
          <button id='update-song-button-click' type="submit">Update Song</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
          <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
          </ul>
        </form>
      // </section>
      );
}

export default EditSongForm;
