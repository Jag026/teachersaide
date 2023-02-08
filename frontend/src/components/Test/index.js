import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import RichTextEditor from "./RichText"
import { useCookies } from 'react-cookie';
import './index.css'

const MAX_USAGE_COUNT = 6;

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
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
  const [cookies, setCookie] = useCookies(['usageCount']);
  const [usageCount, setUsageCount] = useState(cookies.usageCount || 0);

  const user = sessionUser;
  if (user) {
    setCookie('usageCount', '', { expires: new Date(0) });
  }
  const incrementUsageCount = () => {
    if (!user) {
      setUsageCount(parseInt(usageCount) + 1);
      setCookie('usageCount', parseInt(usageCount) + 1, { path: '/' });
    }
  };

  const resetForm = () => {
    window.location.reload();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    await setTextContent("Generating test...");
    await setLogoVisible(true);
    incrementUsageCount();
    let plan =  await dispatch(await sessionActions.fetchTest({ grade, subject, numberOfQuestions }))
    await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
    await setLogoVisible(false);
    await setVisible(true)
    await setFormVisible(false)

    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const saveTest = async(e) => {
    e.preventDefault();
    setErrors([]);
    const testBody = JSON.stringify(textContent["props"]["text"]);
    if (testBody !== "") {
      dispatch(await sessionActions.addTest({ testBody }))
      setSaveSuccessMessage("Test Saved Successfully");
      setTimeout(() => {
        setSaveSuccessMessage("");
      }, 2000)
    } else {
      setSaveSuccessMessage("Test cannot be blank")
    }
  };

  if (usageCount >= MAX_USAGE_COUNT) {
    return (
      <div>
        <h1>You have reached the maximum usage limit</h1>
        <p>Please <a href="/login" className="text-blue-500">login</a> or <a href="/signup" className="text-blue-500">create an account</a> to continue using the app.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-serif text-6xl mt-10 mb-6">Teacher's AIde</h1>
      <h2 className="px-6 text-s">A powerful AI assistant that can generate tests and quizzes in a breeze.</h2>
      <div className="mt-10">
        <p className="px-6 text-s">Example:</p>
        <p className="px-6 ml-4 text-s">11th -- Declaration of Independence and the U.S. Constitution -- Number of questions: 10</p> 
        <p className="px-6 ml-4 text-s">7th -- Models and diagrams to explain the Pythagorean theorem -- Number of questions: 12</p> 
        <p className="px-6 ml-4 text-s">4th -- Measurement units within the customary and metric systems -- Number of questions: 6</p> 

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
          <button className="m-6 mt-10 w-28 h-10 bg-slate-300 border text-l" type="submit">Create Test</button>
        </form>}
        <div className="w-full sm:w-4/5 sm:max-w-2xl mt-6 flex flex-col items-center sm:w-3/5">
        {visible && 
            <div>
              <button className="m-6 w-28 h-10 bg-slate-300 border text-l hover:bg-slate-500" onClick={resetForm} type="submit">Reset</button>
              <button className="m-6 w-28 h-10 bg-slate-300 border text-l" onClick={saveTest} type="submit">Save Test</button>
              <p className="mx-6 mb-10 text-s">{saveSuccessMessage}</p>
            </div>}          
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