import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { csrfFetch } from '../../store/csrf.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userLessons, setUserLessons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await csrfFetch("/api/lessons/lessonplans", {
        method: "GET"
      });
      const data = await response.json();
      let formattedData = []
      let i = 0;
      while (i < data["lessonplans"].length) {
        formattedData.push(data["lessonplans"][i]["planBody"])
        i++;
      }
      setUserLessons(formattedData)
      console.log(formattedData);
      return
    }
    fetchData();
  }, []);


    const user = sessionUser;
    if (!user) {
      return <Redirect to="/login" />
    }

  return (
    <div>
        {sessionUser && <p className="p-4">Username: {sessionUser["username"]}</p>}
        <div className="mt-10 px-4">
          <p>Saved Tests</p>
        {userLessons.map((element) => {
            return <p>{element.substring(0, 200)}.....</p>
          })}
        </div>
    </div>
  );
}


export default ProfilePage;
