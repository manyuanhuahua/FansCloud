import React, { useEffect, useState } from 'react';
import { createSongThunk } from '../../store/song';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import {uploadFilesThunk} from "../../store/aws"
import UploadSong from './UploadSong';
import { csrfFetch } from '../../store/csrf';
import {addSongToPlaylistThunk,getUserPlaylistsThunk} from "../../store/playlist"



function AddSongToPlaylistForm({hideModal,songPlaylistModal, setSongPlaylistModal}){
    const history = useHistory()
    const dispatch = useDispatch();
    const songId = useParams()
    const sessionUser = useSelector(state=>state.session.user);
    const playlists = useSelector(state=>state.playlists)

    const [errors, setErrors] = useState([]);
    const [playlistId, setPlaylistId] = useState();
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(()=>{
      dispatch(getUserPlaylistsThunk()).then(()=>setIsLoaded(true))
    },[dispatch])

    // const albumId = album.id
    // const [showForm, setShowForm] = useState(true)
    console.log('playlists======',playlists)

    const handleSubmit = async (e) => {
      e.preventDefault();


      setErrors([]);

      // console.log('audio----',newSong)

      dispatch(addSongToPlaylistThunk(playlistId,songId)).then((res)=>{
          console.log('playlist----',res)
          hideModal()
          // history.back()
        }).catch(
          async (res) => {
               const data  = await res.json();

            // const data  = await res.json();
            if (data && data.errors) setErrors(data.errors);
            // console.log("indispatch",data.errors)
        })


      };



    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

      // console.log("outdispatch",errors)
      const options= Object.values(playlists).map((playlist)=>{
        return {value:`${playlist.id}`,label:`${playlist.name}`}
      })
      console.log('options======',options)
      console.log('playlistId======',playlistId)
      console.log('playlists======',Object.values(playlists))



    return isLoaded && (
      <>
          <form className="create-song-form" onSubmit={handleSubmit}>
            <div className='form-content'>
            <h2>Add this song to my playlist</h2>
            <select
              value={playlistId}
              onChange={(e)=>setPlaylistId(e.target.value)}
              placeholder="--Choose and option--"
              style={{width:'250px', height:'30px'}}
            >

                <option disabled={true} value="" selected>
                  --Choose and option--
                </option>

                {Object.values(playlists).map((playlist)=>(
                <option value={playlist.id} label={playlist.name} />
              ))}
            </select>

            </div>

          <button id='upload-song-button-click' type="submit" disabled={!playlistId}>Submit</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>
            <ul>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>        </form>

            </>

      );
}

export default AddSongToPlaylistForm;
