import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import songsReducer from './song';
import albumsReducer from './album';
import playlistsReducer from './playlist'
const rootReducer = combineReducers({
    session: sessionReducer,
    songs:songsReducer,
    albums: albumsReducer,
    playlists: playlistsReducer
});

let enhancer;

if(process.env.NODE_ENV === 'production'){
    enhancer = applyMiddleware(thunk)
}else{
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk,logger))
}

const  configureStore = (preloadState) =>{
    return createStore(rootReducer, preloadState, enhancer)
}

export default configureStore;
