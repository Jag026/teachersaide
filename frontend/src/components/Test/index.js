import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import RichTextEditor from "./RichText"
import './index.css'

function Test(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [errors, setErrors] = useState([]);
  const [textContent, setTextContent] = useState("")
  const [resetButton, setResetButton] = useState("")
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  const resetForm = () => {
    window.location.reload();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    await setTextContent("Generating test...");
    await setLogoVisible(true);
    let plan =  await dispatch(await sessionActions.fetchTest({ grade, subject, numberOfQuestions }))
    await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
    await setLogoVisible(false);
    await setVisible(true)
    await setFormVisible(false)

    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-5xl mt-10 mb-6">Teacher's AIde</h2>
      <p className="px-6 text-s">A powerful AI assistant that can generate tests and quizzes in a breeze.</p>
      <div className="mt-10">
        <p className="px-6 text-s">Example:</p>
        <p className="px-6 text-s">Grade: 11th, Subject: The American Revolution, Number of questions: 10</p> 
      </div>
        {formVisible && <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="flex flex-col">
          <label className="mx-4 text-l">
            Enter a grade level
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
            Enter a subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mx-2 mt-4 h-10 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
            Enter number of questions
            <input
              type="text"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          </div>
          <button className="m-6 mt-10 w-28 h-10 bg-slate-300 border text-l" type="submit">Get Test</button>
        </form>}
        <div className="w-5/6 mt-6 flex flex-col items-center sm:w-3/5">
          {visible && <button className="m-6 w-28 h-10 bg-slate-300 border text-l" onClick={resetForm} type="submit">Reset</button>}
          {textContent}
          {logoVisible && <div class="container">
		        <span class="gear-logo">
		        	<img src={require("./apple.png")}  alt="apple image" />
		        </span>
          </div>}

        </div>
    </div>
  );
}

export default Test;