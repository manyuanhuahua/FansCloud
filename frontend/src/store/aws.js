import { csrfFetch } from "./csrf";
const GET_KEYS="aws/GET_KEYS"
const UPLOAD_FILE="aws/UPLOAD_FILE"


const getKeys=(keys)=>{
    return {
        type:GET_KEYS,
        keys
    }
}



export const getKeysThunk = ()=> async dispatch =>{
    const response = await csrfFetch(`/api/awskey`);

    if (response.ok) {
        const keys = await response.json();
        dispatch(getKeys(keys));


    }
}



const initialState = {}
const awsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_KEYS:{
            newState = {}
            newState= action.keys
            return newState
        };
        case UPLOAD_FILE:{
            newState = {}
            newState.audio= action.file
            return newState
        };
        default:
            return state;
    }
}

export default awsReducer;
