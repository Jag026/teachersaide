import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import RichTextEditor from "./RichText"

function LessonPlan(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState([]);
  const [textContent, setTextContent] = useState("")


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    await setTextContent("Loading lesson plan...");
    let plan =  await dispatch(await sessionActions.fetchLessonplan({ grade, subject }))
    await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="mx-4 text-xl">
            Enter a grade level
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="mx-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-xl">
            Enter a subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mx-2 border border-sky-500"
            />
          </label>
          <button className="mx-4 w-28 bg-slate-200 border text-l" type="submit">Get Plan</button>
        </form>
        <div>
          <p>Example: 11th grade, history</p>
          <p>You can also go more in-depth with the subject --- history, the battle of Waterloo</p>
          <p>You can also go more in-depth with the subject --- chemistry, atomic theory</p>
          {textContent}
        </div>
    </div>
  );
}

export default LessonPlan;