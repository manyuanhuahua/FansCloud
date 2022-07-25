import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SongsBrowser from "./components/songBrowser";
import SongDetail from "./components/songDetail";

import CurrentUser from "./components/currentUserpage";
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

        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
          <SongsBrowser />
        </Route>
        <Route path="/songs/:songId">
          <SongDetail />
        </Route>
        <Route path="/currentUser">
          <CurrentUser />
        </Route>
      </Switch>
      )};
    </>
  )
      }
export default App;
