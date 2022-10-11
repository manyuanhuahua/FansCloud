import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {addSongToPlaylistThunk,getUserPlaylistsThunk} from "../../store/playlist"




function AddSongToPlaylistForm({hideModal}){

    const dispatch = useDispatch();
    const songId = useParams()

    const playlists = useSelector(state=>state.playlists)

    const [errors, setErrors] = useState([]);
    const [playlistId, setPlaylistId] = useState();
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(()=>{
      dispatch(getUserPlaylistsThunk()).then(()=>setIsLoaded(true))
    },[dispatch])



    const handleSubmit = async (e) => {
      e.preventDefault();


      setErrors([]);



      dispatch(addSongToPlaylistThunk(playlistId,songId)).then((res)=>{

          hideModal()
          // history.back()
        }).catch(
          async (res) => {
               const data  = await res.json();


            if (data && data.errors) setErrors(['Please select a playlist!']);

        })


      };



    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };



    return isLoaded && (
      <>
          <form className="playlist-song-form" onSubmit={handleSubmit}>
            <div className='playlist-song-form-content'>
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
            {(!playlistId) && <ul style={{marginTop:'10px'}}>
              {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>}
            </div>

          <button id='upload-song-button-click' type="submit" >Submit</button>
          <button type="button" onClick={handleCancelClick} >Cancel</button>

            </form>

            </>

      );
}

export default AddSongToPlaylistForm;
