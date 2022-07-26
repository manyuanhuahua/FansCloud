import React, { useState, useEffect,useSelector } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SongsBrowser from "./components/songBrowser";
import SongDetail from "./components/songDetail";
import CreateSongForm from "./components/songDetail/CreateSongForm";
import CurrentUser from "./components/currentUserpage";
import HomePage from "./components/HomePage";
import CreateAlbumForm from "./components/Album/CreateAlbumForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const sessionUser = useSelector(state => state.session.user);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true))
  },[dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        {/* <Route exact path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route exact path="/songs">
          <SongsBrowser />
        </Route>
        <Route path="/songs/:songId">
          <SongDetail />
        </Route>
        <Route exact path="/you/library">
          <CurrentUser />
        </Route>
        <Route exact path="/currentUser">
          <CurrentUser />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
        {/* <Route path="/">
          <HomePage />
        </Route> */}
      </Switch>
      )};
    </>
  )
      }
export default App;
