import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/loadSong"
const LOAD_SONG_DETAIL = "song/loadSongDetail"
const ADD_SONG = "song/addSong"



const loadSong = songs => ({
    type: LOAD_SONGS,
    songs
  });

const loadSongDetail = song =>({
    type: LOAD_SONG_DETAIL,
    song
})

const addSong = (song) =>{
    return {
        type: ADD_SONG,
        song
    }
}



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

export const createSong = (albumId,song) => async dispatch=>{
    const {
        title,
        description,
        audioUrl,
        previewImage,
    } = song;

    const res = await fetch(`/api/albums/${albumId}/new`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            audioUrl,
            previewImage,
        }),
    });
    if(res.ok){
        const newSong = await res.json()
        dispatch(addSong(newSong))
        return newSong
    }
}


const initialState = {
    songs: null,
}

// const sortList = (list) => {
//     return list.sort((songA, songB) => {
//       return songA.id - songB.id;
//     }).map((song) => song.id);
//   };

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

        case ADD_SONG:{

            if(!state[action.id]){
                newState = {
                    ...state,
                    [action.song.id]:action.song
                };
                const songList = newState.list.map(id => newState[id]);
                songList.push(action.song);
                return newState;
            }
            console.log("add song newState", newState)
            return {
              ...state,
              [action.song.id]: {
                ...state[action.song.id],
                ...action.song
              }
            };
          }

        default:
            return state;
    }
}

export default songsReducer;
