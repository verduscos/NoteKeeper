import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Footer from './components/Footer';
import Notes from "./components/Notes";
import CurrentNote from "./components/Notes/currentNote";
import Create from "./components/Notes/Create";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route  path="/mynotes/notes">
            <Notes />
          </Route>
          <Route exact path="/mynotes/notes/new">
            <Create />
          </Route>
          <Route exact path="/mynotes/notes/:noteId">
            <CurrentNote />
          </Route>

        </Switch>
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
