import React, { useState } from 'react';
import * as songActions from '../../store/song'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

function EditSongForm({song, album, hideModal}){
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [audioUrl, setaudioUrl] = useState(song.audioUrl);
    const [previewImage, setPreviewImage] = useState(song.previewImage);
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(true)



    // console.log("outside submit")

    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);
      hideModal()
        const updateSong = {
            ...song,
            title,
            description,
            audioUrl,
            previewImage
        }

        return dispatch(songActions.editSong(updateSong))
                .catch(async (res) => {
                    const data  = await res.json();

              // const data  = await res.json();
              if (data && data.errors) setErrors(data.errors);
          })


        //   if(updaedSong)
        //     hideModal()
        }
;




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
            placeholder="Audio Url"
            required
            value={audioUrl}
            onChange={(e)=>setaudioUrl(e.target.value)} />
          <input
            type="text"
            placeholder="Song profile image"
            value={previewImage}
            onChange={(e)=>setPreviewImage(e.target.value)} />

          <button type="submit">Update Song</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      </section>
      );
}

export default EditSongForm;
