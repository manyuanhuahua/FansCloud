import React, { useState } from 'react';
import * as albumActions from '../../store/album'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

function CreateAlbumForm({hideForm}){
    const history = useHistory()
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(true)

    // console.log("outside submit")

    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);

        const newAlbum = {
            title,
            description,
            previewImage
        }

        let createdAlbum;
        try {
            const res = await dispatch(albumActions.createAlbum(newAlbum));
            createdAlbum = await res.json()
        } catch (error) {
            // const data  = await res.json();
            if (createdAlbum && createdAlbum.errors) setErrors(createdAlbum.errors);
        }

        console.log("in created album thunk",createdAlbum)
        if (createdAlbum) {
          setErrors({});
          history.push(`/albums/${createdAlbum.id}`);
          setShowForm(false)
        }
      };

    //     dispatch(songActions.createSong(albumId,newSong)).catch(
    //         async (res) => {
    //           // console.log("in the catch")

    //           const data  = await res.json();

    //           // console.log("data.error", data.errors)

    //           if (data && data.errors) setErrors(data.errors);

    //         }
    //         ).then(()=>history.push('/currentUser'));

    //   }
    //   };
    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors({});
        hideForm()
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

          <button type="submit">Upload Album</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
        </form>
      </section>
      );
}

export default CreateAlbumForm;
