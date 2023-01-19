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
  const [resetButton, setResetButton] = useState("")
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const resetForm = () => {
    window.location.reload();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    await setTextContent("Loading lesson plan...");
    let plan =  await dispatch(await sessionActions.fetchLessonplan({ grade, subject }))
    await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
    await setVisible(true)
    await setFormVisible(false)

    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="flex flex-col items-center">
        <h2 className="font-serif text-5xl my-10">Teacher's AIde</h2>
        <p className="p-5">A powerful AI assistant that can generate lessons plans for any class.</p>
        <p>Example: grade level: 11th || subject: science, molar mass</p>
        <p>Example: grade level: 7th || subject: history, the American Revolution</p> 
        <p>Example: grade level: 3rd || subject: math, addition and subtraction</p>

        {formVisible && <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div>
          <label className="mx-4 text-l">
            Enter a grade level
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="mx-2 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
            Enter a subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mx-2 h-10 p-2 border border-sky-500"
            />
          </label>
          </div>
          <button className="m-6 w-28 h-10 bg-slate-300 border text-l" type="submit">Get Plan</button>
        </form>}
        <div className="w-3/5 mt-6 flex flex-col items-center">
          {visible && <button className="m-6 w-28 h-10 bg-slate-300 border text-l" onClick={resetForm} type="submit">Reset</button>}
          {textContent}
        </div>
    </div>
  );
}

export default LessonPlan;