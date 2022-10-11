import React, { useState } from 'react';
import {createPlaylistThunk} from "../../store/playlist"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import "./playlist.css"

function CreatePlaylistForm({hideModal}){

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);

        const newPlaylist = {
            name,
            previewImage
        }

      dispatch(createPlaylistThunk(newPlaylist)).then(()=>

          hideModal()

          ).catch(
            async (res) => {

              const data  = await res.json();

              if (data && data.errors) setErrors(data.errors);
              }
            )

          };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };





    return (

        <form className="create-playlist-form" onSubmit={handleSubmit}>
          <div className='form-content'>

            <input
              type="text"
              placeholder="Please Add Your Playlist Name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)} />
            <input
              type="text"
              placeholder="Please Add Your Playlist Cover image"
              value={previewImage}
              onChange={(e)=>setPreviewImage(e.target.value)} />

            <button id='upload-Playlist-button-click' type="submit" >Create Playlist</button>
            <button type="button" onClick={handleCancelClick} >Cancel</button>
          </div>
            <ul>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
        </form>

      );
}

export default CreatePlaylistForm;
