import React, { useEffect,useState } from 'react';
import { createSongThunk } from '../../store/song';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

import { csrfFetch } from '../../store/csrf';

function CreateSongForm({hideModal,albumId,createModal, setCreateModal}){
    const history = useHistory()
    const dispatch = useDispatch();

    const sessionUser = useSelector(state=>state.session.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioUrl, setaudioUrl] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [audioFile,setAudioFile] = useState("");




    const handleSubmit = async (e) => {
      e.preventDefault();


      setErrors([]);
      const newSong = {
        title,
        description,
        audioUrl:audioFile,
        previewImage
      }


      dispatch(createSongThunk(albumId,newSong)).then((res)=>{

          hideModal()
          history.back()
        }).catch(
          async (res) => {
               const data  = await res.json();

            if (data && data.errors) setErrors(data.errors);

        })


      };



    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

      // console.log("outdispatch",errors)
      const updateAudio = (e) => {
        const file = e.target.files[0];
        setaudioUrl(file);
      };

      const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("audioUrl", audioUrl);

        const res = await csrfFetch('/api/songs/upload', {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
      });

        const audio = await res.json()

        setAudioFile(audio.audioUrl)

      };


    return (
      <>


            <form onSubmit={handleUpload}>
            <div className='aws-box'>
            <input
              type="file"
              placeholder="Audio Url(mp3)"


              accept=".mp3"
              onChange={updateAudio}
              />


              <button type="submit">Upload Audio</button>
              </div>
            </form>
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
              placeholder="Song profile image"
              value={previewImage}
              onChange={(e)=>setPreviewImage(e.target.value)} />
            </div>

          <button id='upload-song-button-click' type="submit" onClick={()=>setCreateModal(!createModal)}>Create New Song</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
            <ul>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>        </form>

            </>

      );
}

export default CreateSongForm;
