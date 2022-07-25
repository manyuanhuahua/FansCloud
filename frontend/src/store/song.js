import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/loadSong"
const LOAD_SONG_DETAIL = "song/loadSongDetail"


const loadSong = songs => ({
    type: LOAD_SONGS,
    songs
  });

const loadSongDetail = song =>({
    type: LOAD_SONG_DETAIL,
    song
})

export const getSong = () => async dispatch => {

    const response = await csrfFetch(`/api/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSong(songs));
        // console.log("getsongs",songs)
        // return response

    }
  };

export const getSongDetail = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${id}`)

    if(response.ok){
        const song = await response.json();

        dispatch(loadSongDetail(song))
    }
}


const initialState = {
    songs: null,
}

const songsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case LOAD_SONGS:{
            newState = Object.assign({},state)
            newState.songs = action.songs.Songs
            // console.log("newState", newState)
            return newState
        };
        case LOAD_SONG_DETAIL:{
            newState = {}
            // console.log("action.song", action.song)
            newState.song = action.song

            return newState
        }

        default:
            return state;
    }
}

export default songsReducer;
