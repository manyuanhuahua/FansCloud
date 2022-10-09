import { csrfFetch } from './csrf';

const LOAD_SONGS = "song/loadSong"
const LOAD_SONG_DETAIL = "song/loadSongDetail"
const ADD_SONG = "song/addSong"
const REMOVE_SONG="song/removeSong"
const EDIT_SONG = "song/updateSong"


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

const updateSong = (song) =>{
    return {
        type: EDIT_SONG,
        song,
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
        dispatch(updateSong(song));
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

        return songId
    }

}


export const getSong = () => async dispatch => {

    const response = await csrfFetch(`/api/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSong(songs));


    }
  };

export const getSongDetail = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${id}`)

    if(response.ok){
        const song = await response.json();

        dispatch(loadSongDetail(song))
    }
}

export const createSongThunk = (albumId,song) => async dispatch=>{

    const res = await csrfFetch(`/api/albums/${albumId}/new`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(song),
    });
    if(res.ok){
        const newSong = await res.json()
        dispatch(addSong(albumId, newSong))
        return res
    }
}



const initialState = {}


const songsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case LOAD_SONGS:{
            newState = Object.assign({},state)
            newState= action.songs.Songs

            return newState
        };

        case LOAD_SONG_DETAIL:{
            newState = {}

            newState = action.song

            return newState
        }

        case ADD_SONG:{


            newState = {...state}

                newState[action.song.id] = action.song

                return newState;
            }

        case EDIT_SONG:{
                newState = {...state}

                newState[action.song.id] = action.song

                    return newState;
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
