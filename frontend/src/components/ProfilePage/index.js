import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { csrfFetch } from '../../store/csrf.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userLessons, setUserLessons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await csrfFetch("/api/lessons/lessonplans", {
        method: "GET"
      });
      const data = await response.json();
      let formattedData = []
      let i = 0;
      while (i < data["lessonplans"].length) {
        formattedData.push((String(data["lessonplans"][i]["planBody"])).replace(/\\n/g, ""))
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
            return <div>
              <p>{element.substring(0, 120)}.....</p>
              <button onClick={handleOpen} className="m-6 w-28 h-10 bg-slate-300 border text-l">View</button>
              <button className="m-6 w-28 h-10 bg-slate-300 border text-l">Delete</button>
      {isOpen && (
          <div>
           <div>
             <div>
               <p>{element}</p>
               <button onClick={handleClose} className="m-2 w-14 bg-slate-300 border text-s mb-20">Close</button>
             </div>
             </div>
           </div>)}
              </div>
          })}
        </div>
    </div>
  );
}


export default ProfilePage;
