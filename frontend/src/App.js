import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
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
import Teks from "./components/Teks";
import ResetPasswordForm from "./components/ResetPassword/index.js"
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage.js"

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
            <Helmet>
              <title>Teacher's Aide - AI Powered Teaching</title>
              <meta name="description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
              <meta property="og:title" content="Teacher's Aide - AI Powered Lesson Plans" />
              <meta property="og:description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
              <meta property="og:image" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
              <meta property="og:url" content="https://www.teachersaide.io"/>
              <meta property="og:type" content="website" />
              <meta property="twitter:card" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
              <meta property="twitter:title" content="Teacher's Aide - AI Powered Teaching" />
              <meta property="twitter:description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
              <meta property="twitter:image" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
              <link rel="canonical" href="https://www.teachersaide.io" />
            </Helmet>
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
          <Route exact path="/posts/:slug">
            <BlogPosts />
          </Route>
          <Route exact path="/tek-lesson-plans">
            <Teks />
          </Route>
          <Route exact path="/resetpassword">
            <ResetPasswordForm />
          </Route>
          <Route exact path="/resetpasswordpage/:para">
            <ResetPasswordPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;