import { csrfFetch } from "./csrf";
const GET_KEYS="aws/GET_KEYS"
const UPLOAD_FILE="aws/UPLOAD_FILE"


const getKeys=(keys)=>{
    return {
        type:GET_KEYS,
        keys
    }
}

// const uploadFiles=(file)=>{
//     return {
//         type:GET_KEYS,
//         file
//     }
// }

export const getKeysThunk = ()=> async dispatch =>{
    const response = await csrfFetch(`/api/awskey`);
    console.log('inthunk-------')
    if (response.ok) {
        const keys = await response.json();
        dispatch(getKeys(keys));


    }
}

// export const uploadFilesThunk = (file) => async dispatch=>{

//     const res = await csrfFetch(`/api/songs/upload`,{
//         method:'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({file}),
//     });
//     if(res.ok){
//         const newFile = await res.json()
//         // console.log(newAlbum)
//         dispatch(uploadFiles(newFile))
//     }
//     return res
// }

const initialState = {}
const awsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_KEYS:{
            newState = {...state}
            newState= action.keys
            return newState
        };
        case UPLOAD_FILE:{
            newState = {...state}
            newState.audio= action.file
            return newState
        };
        default:
            return state;
    }
}

export default awsReducer;
