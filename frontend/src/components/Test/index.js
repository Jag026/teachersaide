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
  const [showExamples, setShowExample] = useState(true);

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
    setShowExample(false)
    await setTextContent("Loading...");
    await setLogoVisible(true);
    incrementUsageCount();
    let plan = "";

    //update text while plan is loading
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Searching the database...");
        }
    }, 4000)
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Drafting questions...");
        }
    }, 8000)
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Writing answer choices...");
        }
    }, 12000)
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Formatting test...");
        }
    }, 16000)
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Almost finished...");
        }
    }, 23000)
    setTimeout(() => {
      if (plan === "") {
        setTextContent("Sorry, unable to draft plan, we're currently experiencing high volume. Please try again soon.");
        }
    }, 48000)

    plan =  await dispatch(await sessionActions.fetchTest({ grade, subject, numberOfQuestions }))
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
      <div className="flex flex-col justify-center items-center mt-10 sm:mt-20">
      <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
      <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">Teacher's AIde</h2>
      <p className="mt-2 text-center text-gray-600">A powerful AI assistant that can generate lessons plans for any subject.</p>
      
        {formVisible && <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="flex flex-col">
          <label className="w-full">
            Enter a grade level
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="h-10 border border-grey-100 px-4 w-full mb-4"
              placeholder="example: 10th"
            />
          </label>
          <label className="w-full">
            Enter a subject
            <textarea
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="h-10=4 border border-grey-100 px-6 pt-1 w-full mb-4"
              placeholder="Chemistry, acids, bases and molarity questions."
            />
          </label>
          <label className="w-full">
            Enter number of questions
            <input
              type="text"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              required
              className="h-10 border border-grey-100 px-4 w-full mb-4"
              placeholder="12"
            />
          </label>
          </div>
          <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" type="submit">Create Test</button>
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
          {showExamples && <div className="mt-16 w-full">
            <p className="text-center text-2xl font-bold tracking-tight text-gray-900">Examples:</p>
            <textarea
              type="text"
              className="h-12 border border-grey-100 px-4 w-full mb-4"
              value="11th -- Declaration of Independence and the U.S. Constitution -- Number of questions: 10"
            />
            <textarea
              type="text"
              className="h-12 border border-grey-100 px-4 w-full mb-4"
              value="9th Models and diagrams to explain the Pythagorean theorem -- Number of questions: 12"
            />
            <textarea
              type="text"
              className="h-12 border border-grey-100 px-4 w-full mb-4"
              value="5th -- Measurement units within the customary and metric systems -- Number of questions: 6"
            />
      
          </div>}
        </div>
    </div>
   </div>
  );
}

export default Test;