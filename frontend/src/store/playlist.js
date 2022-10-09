import { csrfFetch } from "./csrf";


const GET_PLAYLISTS="playlist/GET_PLAYLISTS"
const CREATE_PLAYLIST="playlist/CREATE_PLAYLIST"
const LOAD_PLAYLIST_DETAIL="playlist/LOAD_PLAYLIST_DETAIL"
const REMOVE_PLAYLIST="playlist/REMOVE_PLAYLIST"
const EDIT_PLAYLIST="playlist/EDIT_PLAYLIST"
const GET_USER_PLAYLISTS="playlist/GET_USER_PLAYLISTS"
const ADD_SONG_TO_PLAYLIST = "playlist/ADD_SONG_TO_PLAYLIST"

const getUserPlaylists = (playlists) => {
    return {
      type: GET_USER_PLAYLISTS,
      playlists
    }
  }

const addSongToPlaylist = (songPlaylist) =>{
    return {
        type:ADD_SONG_TO_PLAYLIST,
        songPlaylist
    }
}

const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

const loadPlaylistDetail = playlist =>({
    type: LOAD_PLAYLIST_DETAIL,
    playlist
})

const createPlaylist = (playlist) =>{
    return {
        type: CREATE_PLAYLIST,
        playlist
    }
}

const editPlaylist = (playlist) =>{
    return {
        type: EDIT_PLAYLIST,
        playlist,
    }
}

const deletePlaylist = (playlistId) => ({
    type: REMOVE_PLAYLIST,
    playlistId,
  });



export const deletePlaylistThunk =(playlistId)=>async dispatch=>{
    const response = await csrfFetch(`/api/playlists/${playlistId}`,{
        method: `DELETE`,
    });
    if(response.ok){
        dispatch(deletePlaylist(playlistId));
    }
    return response

}



export const editPlaylistThunk = (playlist)=> async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${playlist.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(playlist)
    })

    if (response.ok) {
        const editedPlaylist = await response.json();

        dispatch(editPlaylist(editedPlaylist));
    }
    return response;
}


export const getPlaylistsThunk = () => async dispatch => {

    const response = await csrfFetch(`/api/playlists`);
    if (response.ok) {
        const playlists = await response.json();
        dispatch(getPlaylists(playlists));

    }
    return response
  };

  export const getUserPlaylistsThunk = () => async dispatch => {

    const response = await csrfFetch(`/api/session/playlists`);
    if (response.ok) {
        const playlists = await response.json();

        dispatch(getUserPlaylists({playlists}));
    }
    return response
  };

  export const getPlaylistDetailThunk = (playlistId) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${playlistId}`)


    if(response.ok){
        const playlist = await response.json();

        dispatch(loadPlaylistDetail(playlist))
    }
    return response
}



export const createPlaylistThunk = (playlist) => async dispatch=>{

        const res = await csrfFetch(`/api/playlists/new`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlist),
        });
        const newPlaylist = await res.json()

        if(res.ok){


            dispatch(createPlaylist(newPlaylist))
        }
        // return res
    }

export const addSongToPlaylistThunk = (playlistId,songId) => async dispatch=>{
        const res = await csrfFetch(`/api/playlists/${playlistId}/new`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(songId),
        });
        if(res.ok){


            const data = await res.json()


            dispatch(addSongToPlaylist(data))
        }
        return res
    }


const initialState = {}


const playlistsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_PLAYLISTS:{
            newState = {}

            newState = action.playlists

            return newState
        };
        case GET_USER_PLAYLISTS:{
            newState = {}

            newState = action.playlists.playlists.playlists

            return newState
        };
        case LOAD_PLAYLIST_DETAIL:{
            newState = {...state}

            newState= action.playlist
            return newState
        }
        case CREATE_PLAYLIST:{

            newState = {...state};
            newState[action.playlist.id] = action.playlist

            return newState;
        }

        case EDIT_PLAYLIST:{
            newState = {...state};
            newState[action.playlist.id] = action.playlist

            return newState;

       }
        case REMOVE_PLAYLIST:{
            const newStae = {...state}
            delete newStae[action.playlistId]
            return newStae
          }

        default:
            return state;
    }
}

export default playlistsReducer;
