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
    <div className="flex flex-col items-center">
        <h2 className="font-serif text-5xl my-10">Teacher's AIde</h2>
        <p className="p-5">An AI assistant that can quickly generate lesson plans for all grade levels. Enter a grade level and subject to get started</p>
        <p>Example: grade level: 11th || subject: science, molar mass</p>
        <p>Example: grade level: 10th || subject: history, the French Revolution</p> 
        <p>Example: grade level: 2nd || subject: math, addition an subtraction</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div>
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
          </div>
          <button className="m-6 w-28 bg-slate-200 border text-l" type="submit">Get Plan</button>
        </form>
        <div>
          {textContent}
        </div>
    </div>
  );
}

export default LessonPlan;