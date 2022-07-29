import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/loadSong"
const LOAD_SONG_DETAIL = "song/loadSongDetail"
const ADD_SONG = "song/addSong"
const REMOVE_SONG="song/removeSong"


const loadSong = songs => ({
    type: LOAD_SONGS,
    songs
  });

const loadSongDetail = song =>({
    type: LOAD_SONG_DETAIL,
    song
})

const addSong = (albumId, song) =>{
    return {
        type: ADD_SONG,
        song,
        albumId
    }
}

const removeSong = (songId, albumId) => ({
    type: REMOVE_SONG,
    songId,
    albumId,

  });

  export const editSong = (song)=> async dispatch =>{
    const response = await csrfFetch(`/api/songs/${song.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const editedSong = await response.json();
        dispatch(addSong(song));
        return editedSong;
      }
}





export const deleteSong =(songId, albumId)=>async dispatch=>{
    const response = await csrfFetch(`/api/songs/${songId}`,{
        method: `DELETE`,
    });
    if(response.ok){
        const { deletedSongId: songId } = await response.json()
        dispatch(removeSong(songId, albumId));
        // console.log(data)
        return songId
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

    const res = await csrfFetch(`/api/albums/${albumId}/new`,{
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
        dispatch(addSong(albumId, newSong))
        return res
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
                return newState;
            }
            // console.log("add song newState", newState)
            // return {
            //   ...state,
            //   [action.song.id]: {
            //     ...state[action.song.id],
            //     ...action.song
            //   }
            // };
          }

          case REMOVE_SONG:{
            const newStae = {...state}
            delete newStae[action.songId]
            return newStae
          }
        default:
            return state;
    }
}

export default songsReducer;