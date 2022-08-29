import { csrfFetch } from "./csrf";


const GET_PLAYLISTS="playlist/GET_PLAYLISTS"
const CREATE_PLAYLIST="playlist/CREATE_PLAYLIST"
const LOAD_PLAYLIST_DETAIL="playlist/LOAD_PLAYLIST_DETAIL"
const REMOVE_PLAYLIST="playlist/REMOVE_PLAYLIST"
const EDIT_PLAYLIST="playlist/EDIT_PLAYLIST"



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
        // console.log("getalbums",albums)
    }
    return response
  };

  export const getPlaylistDetail = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${id}`)

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
            body: JSON.stringify({playlist}),
        });
        if(res.ok){
            const newPlaylist = await res.json()
            // console.log(newAlbum)
            dispatch(createPlaylist(newPlaylist))
        }
        return res
    }

const initialState = {}


const playlistsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_PLAYLISTS:{
            newState = {}
            // console.log("action",action.albums)
            newState = action.playlists
            // console.log("newState", newState)
            return newState
        };
        case LOAD_PLAYLIST_DETAIL:{
            newState = {...state}
            // console.log("action.song", action.song)
            newState.playlist = action.playlist
            return newState
        }
        case CREATE_PLAYLIST:{

            const newState = {
                ...state,
                [action.playlist.id]: action.playlist
            }
            return newState
        }

        case EDIT_PLAYLIST:{

           return {
            ...state,
            [action.playlist.id]: {
              ...state[action.playlist.id],
              ...action.playlist
            }
          };
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
