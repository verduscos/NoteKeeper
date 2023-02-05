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
import NotFound from "./components/NotFound";

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

        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <Homepage />
          </Route>
          <Route exact path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
            <Footer />
          </Route>
          <Route exact path="/mynotes/notes">
            <Navigation isLoaded={isLoaded} />
            <Notebooks />
            {/* <Notes /> */}
            {/* <Create /> */}
            {/* <Footer /> */}
          </Route>
          <Route exact path="/mynotes/notes/:noteId">
            <Navigation isLoaded={isLoaded} />
            <Notebooks />
            <Notes />
            <Create />
            <Footer />
          </Route>
          <Route exact path="/mynotes/notebook/:notebookId">
            <Navigation isLoaded={isLoaded} />
            <Notebooks />
            <Notes />
            <Create />
            <Footer />
          </Route>
          <Route exact path="/mynotes/notebook/:notebookId/notes/:noteId">
            <Navigation isLoaded={isLoaded} />
            <Notebooks />
            <Notes />
            <CurrentNote />
            <Footer />
          </Route>
          <Route exact path="/mynotes/notes/create">
            <Navigation isLoaded={isLoaded} />
            <Notebooks />
            <Notes />
            <Create />
            <Footer />
          </Route>
          <Route>
            <Navigation isLoaded={isLoaded} />
            <NotFound />
            <Footer />
          </Route>
        </Switch>
        </>
      )}
    </>
  );
}

export default App;
