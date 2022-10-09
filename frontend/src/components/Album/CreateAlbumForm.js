import React, { useState } from 'react';
import * as albumActions from '../../store/album'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./album.css"

function CreateAlbumForm({hideModal,isUpload, setIsUpload}){
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);
      // hideModal()
        const newAlbum = {
            title,
            description,
            previewImage
        }

      dispatch(albumActions.createAlbum(newAlbum)).then(()=> hideModal()).catch(
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

        <form className="create-album-form" onSubmit={handleSubmit}>
          <div className='form-content'>

            <input
              type="text"
              placeholder="Please Add Your Album Title"
              required
              value={title}
              onChange={(e)=>setTitle(e.target.value)} />
            <input
              type="text"
              placeholder="Please Add Your Album Description"
              required
              value={description}
              onChange={(e)=>setDescription(e.target.value)} />
            <input
              type="text"
              placeholder="Please Add Your Album profile image"
              value={previewImage}
              onChange={(e)=>setPreviewImage(e.target.value)} />

            <button id='upload-album-button-click' type="submit" onClick={()=>setIsUpload(!isUpload)}>Upload Album</button>
            <button type="button" onClick={handleCancelClick} >Cancel</button>
          </div>
            <ul>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
        </form>

      );
}

export default CreateAlbumForm;
