import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function LessonPlan() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [planText, setPlanText] = useState("Click the get plan button to get a lesson plan.");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    setPlanText("Loading lesson plan...");
    let plan =  await dispatch(await sessionActions.fetchLessonplan({ grade, subject }))
    console.log(grade, subject);
    await setPlanText(plan.replace(/\n/g, '\n'))
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Grade
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <button type="submit">Get Plan</button>
        </form>
        <textarea value={planText}></textarea>
    </div>
  );
}

export default LessonPlan;