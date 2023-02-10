import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as sessionActions from "../../store/session";
import RichTextEditor from "./RichText"
import CookiesBanner from './CookiesBanner'
import { useCookies } from 'react-cookie';
import './index.css'

const MAX_USAGE_COUNT = 6;

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
    setTextContent("Drafting lesson plan...");
    await setLogoVisible(true);
    incrementUsageCount();
    let plan =  await dispatch(await sessionActions.fetchLessonplan({ grade, subject }))
    await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
    await setLogoVisible(false);
    await setVisible(true)
    await setFormVisible(false)

    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const saveLessonplan = async(e) => {
    e.preventDefault();
    setErrors([]);
    const planBody = JSON.stringify(textContent["props"]["text"]);
    if (planBody !== "") {
      dispatch(await sessionActions.addLessonplan({ planBody }))
      setSaveSuccessMessage("Plan Saved Successfully");
      setTimeout(() => {
        setSaveSuccessMessage("");
      }, 2000)
    } else {
      setSaveSuccessMessage("Plan cannot be blank")
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
   <>
     <Helmet>
          <title>Teacher's Aide - AI Powered Teaching</title>
          <meta name="description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
          <meta property="og:title" content="Teacher's Aide - AI Powered Teaching" />
          <meta property="og:description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
          <meta property="og:image" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
          <meta property="og:url" content="https://www.teachersaide.io"/>
          <meta property="og:type" content="website" />
          <meta property="twitter:card" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
          <meta property="twitter:title" content="Teacher's Aide - AI Powered Teaching" />
          <meta property="twitter:description" content="Our AI-powered educational platform creates personalized lesson plans and tests for classes of all ages. Save time, focus more on students, live happier." />
          <meta property="twitter:image" content="https://user-images.githubusercontent.com/74638539/217420111-f38ec093-4b7d-4a82-86d2-0a7ead8a7f7a.jpg" />
          <link rel="canonical" href="https://www.teachersaide.io" />
     </Helmet>
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-5xl mt-14 mb-6">Teacher's AIde</h2>
      <p className="text-s px-6">A powerful AI assistant that can generate lessons plans for any subject.</p>
      <div className="mt-14">
        <p className="px-6 text-s">Examples:</p>
        <p className="px-6 ml-4 text-s">11th -- World History, the major effects of the following events from 8000 BC to 500 BC</p> 
        <p className="px-6 ml-4 text-s">2nd -- Science, forms of energy and properties of matter</p>
        <p className="px-6 ml-4 text-s">7th -- Biology, animal cell structures</p>
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
              className="mx-2 my-4 h-10 w-14 p-2 border border-sky-500"
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
          <button className="m-10 w-28 h-10 bg-slate-300 border text-l hover:bg-slate-500" type="submit">Create Plan</button>
        </form>}
        <div className="w-full sm:w-4/5 sm:max-w-2xl px-1 mt-6 flex flex-col items-center">
          {visible && 
            <div>
              <button className="m-6 w-28 h-10 bg-slate-300 border text-l hover:bg-slate-500" onClick={resetForm} type="submit">Reset</button>
              <button className="m-6 w-28 h-10 bg-slate-300 border text-l" onClick={saveLessonplan} type="submit">Save Plan</button>
              <p className="mx-6 mb-10 text-s">{saveSuccessMessage}</p>
            </div>
          }
          {textContent}
          {logoVisible && <div class="container">
		        <span class="gear-logo">
		        	<img src={require("./apple.png")}  alt="apple image" />
		        </span>
          </div>}

        </div>
        <CookiesBanner />
    </div>
  </>
  );
}

export default LessonPlan;