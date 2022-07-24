import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/loadSong"

const loadSong = songs => ({
    type: LOAD_SONGS,
    songs
  });

export const getSong = () => async dispatch => {

    const response = await csrfFetch(`/api/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSong(songs));
        // return response
    }
  };
// export const getSongs = () => async dispatch =>{
//     const res = await fetch(`/api/songs`);
//     const songs = await res.json()
//     dispatch(loadSong(songs))
//     return songs
// }


const initialState = { songs: null}

const songsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case LOAD_SONGS:{
            newState = Object.assign({},state)
            newState.songs = action.songs.Songs
            console.log("newState", newState)
            return newState
        }
        default:
            return state;
    }
}

export default songsReducer;
