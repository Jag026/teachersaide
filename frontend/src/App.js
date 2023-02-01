import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import LessonPlan from "./components/LessonPlan";
import Test from "./components/Test";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import SitePolicies from "./components/SitePolicies";
import CreateBlogpost from "./components/Blogpost";
import BlogPosts from "./components/Blogpost/blogposts.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(sessionActions.restoreLessons()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LessonPlan />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/policies">
            <SitePolicies />
          </Route>
          <Route exact path="/create-blogpost">
            <CreateBlogpost />
          </Route>
          <Route exact path="/:slug">
            <BlogPosts />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;