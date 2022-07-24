import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/LOAD_SONGS"

const loadSong = songs => ({
    type: LOAD_SONGS,
    songs
  });

export const getSong = () => async dispatch => {
    // console.log("thunk")

    const response = await csrfFetch(`/api/songs`);
    // if (response.ok) {
        // console.log("response",response)
        const songs = await response.json();
        // console.log("songs frontend",songs)
        dispatch(loadSong(songs));
        return songs
    }
//   };
// export const getSongs = () => async dispatch =>{
//     const res = await fetch(`/api/songs`);
//     const songs = await res.json()
//     dispatch(loadSong(songs))
//     return songs
// }


const initialState = { songs: null}

const songsReducer = (state = initialState, action)=>{
    let newState;
    // console.log("action",action.songs)
    switch(action.type){
        case LOAD_SONGS:{
            newState = Object.assign({},state)
            newState.songs = action.songs
            console.log("mewState", newState)
            return newState
        }
        default:
            return state;
    }
}

export default songsReducer;
