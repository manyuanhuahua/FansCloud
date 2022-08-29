import { csrfFetch } from "./csrf";


const GET_PLAYLISTS="album/getPlaylists"
const CREATE_PLAYLIST="album/createPlaylist"
const LOAD_PLAYLIST_DETAIL="album/loadPlaylistDetail"
const REMOVE_PLAYLIST="album/removePlaylist"
const EDIT_PLAYLIST = "album/updatePlaylist"



const loadPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

const loadPlaylistDetail = playlist =>({
    type: LOAD_PLAYLIST_DETAIL,
    playlist
})

const addPlaylist = (playlist) =>{
    return {
        type: CREATE_PLAYLIST,
        playlist
    }
}

const updatePlaylist = (playlist) =>{
    return {
        type: EDIT_PLAYLIST ,
        playlist,
    }
}

const removePlaylist = (playlistId) => ({
    type: REMOVE_PLAYLIST,
    playlistId,
  });

export const deletePlaylist =(playlistId)=>async dispatch=>{
    const response = await csrfFetch(`/api/playlists/${playlistId}`,{
        method: `DELETE`,
    });
    if(response.ok){
        const { deletedPlaylistId: playlistId } = await response.json()
        dispatch(removePlaylist(playlistId));
        // console.log(data)
        return playlistId
    }

}



export const editPlaylist = (playlist)=> async dispatch =>{
    const response = await csrfFetch(`/api/albums/${playlist.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(playlist)
    })
    if (response.ok) {
        const editedPlaylist = await response.json();
        dispatch(updatePlaylist(playlist));
        return editedPlaylist;
      }
}


export const getPlaylists = () => async dispatch => {

    const response = await csrfFetch(`/api/playlists`);
    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists));
        // console.log("getalbums",albums)
        // return response
    }
  };

  export const getPlaylistDetail = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${id}`)

    if(response.ok){
        const playlist = await response.json();

        dispatch(loadPlaylistDetail(playlist))
    }
}



export const createPlaylist = (playlist) => async dispatch=>{
        const {
            title,
            description,
            previewImage,
        } = playlist;

        const res = await csrfFetch(`/api/albums/new`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                previewImage,
            }),
        });
        if(res.ok){
            const newAlbum = await res.json()
            // console.log(newAlbum)
            dispatch(addAlbum(newAlbum))
            return res
        }
    }

const initialState = {
    playlists: null,
}

const playlistsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_ALBUMS:{
            newState = Object.assign({},state)
            // console.log("action",action.albums)
            newState = action.albums
            // console.log("newState", newState)
            return newState
        };
        case LOAD_ALBUM_DETAIL:{
            newState = {}
            // console.log("action.song", action.song)
            newState.album = action.album
            return newState
        }
        case CREATE_ALBUM:{

            const newState = {
                ...state,
                [action.album.id]: action.album
            }
            return newState
        }

        case EDIT_ALBUM:{

           return {
            ...state,
            [action.album.id]: {
              ...state[action.album.id],
              ...action.album
            }
          };
       }

        case REMOVE_ALBUM:{
            const newStae = {...state}
            delete newStae[action.albumId]
            return newStae
          }

        default:
            return state;
    }
}

export default playlistsReducer;
