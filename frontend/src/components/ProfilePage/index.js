import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { csrfFetch } from '../../store/csrf.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userLessons, setUserLessons] = useState("");

  const lessons = async() => {
    const response = await csrfFetch("/api/lessons/lessonplans", {
      method: "GET"
    });
    const data = await response.json();
    console.log(JSON.stringify(data["lessonplans"]));
    setUserLessons(data["lessonplans"][0]["planBody"])
    return response;
  };

  if (userLessons === "") {
    lessons();
  }

    const user = sessionUser;
    if (!user) {
      return <Redirect to="/login" />
    }



  return (
    <div>
        {sessionUser && <p>{sessionUser["username"]}</p>}
        <p>{userLessons}</p>
    </div>
  );
}


export default ProfilePage;
