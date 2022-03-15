import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Footer from './components/Footer';
import Notes from "./components/Notes";
import Notebooks from "./components/NoteBooks";
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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/mynotes/notes">
            <Notebooks />
            <Notes />
            <Create />
          </Route>
          <Route exact path="/mynotes/notebook/:notebookId">
            <Notebooks />
            <Notes />
            <Create />
          </Route>
          <Route exact path="/mynotes/notes/create">
            <Notebooks />
            <Notes />
            <Create />
          </Route>
          <Route exact path="/mynotes/notes/:noteId">
            <Notebooks />
            <Notes />
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
