import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SongsBrowser from "./components/Song/SongBrowser";
import SongDetail from "./components/Song/SongDetail";

import HomePage from "./components/HomePage";
import AlbumDetail from "./components/Album/AlbumDetail";

import CurrentUserAlbums from "./components/CurrentUserpage/CurrentUserAlbums";
import PlaylistLists from "./components/Playlist/PlaylistList";
import PlaylistDetail from "./components/Playlist/PlaylistDetail";
import Explore from "./components/CurrentUserpage/explore";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true))
  },[dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

        <Route exact path="/songs">
          <SongsBrowser />
        </Route>
        <Route exact path="/songs/:songId">
          <SongDetail />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route exact path="/albums">
          <CurrentUserAlbums />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/albums/:albumId">
          <AlbumDetail />
        </Route>

        <Route exact path="/playlists">
          <PlaylistLists />
        </Route>
        <Route exact path="/playlists/:playlistId">
          <PlaylistDetail />
        </Route>
        </Switch>
      )}

    </>
  )
      }
export default App;
