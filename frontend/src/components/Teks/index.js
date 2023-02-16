import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Form from './Teks-form';
import RichTextEditor from "./RichText"
import CookiesBanner from './CookiesBanner'
import { useCookies } from 'react-cookie';
import './index.css'

const MAX_USAGE_COUNT = 5;

function Teks(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [formValues, setFormValues] = useState({
        gradeLevel: '',
        subject: '',
        knowledge: '',
        skill: '',
      });
    const [grade, setGrade] = useState("");
    const [knowledge, setKnowledge] = useState("");
    const [skill, setSkill] = useState("");
    const [text, setText] = useState("");
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

    const handleFormSubmit = async (values) => {
        setFormValues(values);
        const { gradeLevel, knowledge, skill } = values;
        setErrors([]);
        setTextContent("Loading...");
        await setLogoVisible(true);
        incrementUsageCount();
        let plan = "";
    
        //update text while plan is loading
        setTimeout(() => {
          if (plan === "") {
            setTextContent("Sharpening Pencils...");
            }
        }, 4000)
        setTimeout(() => {
          if (plan === "") {
            setTextContent("Brainstorming ideas...");
            }
        }, 8000)
        setTimeout(() => {
          if (plan === "") {
            setTextContent("Drafting lessons...");
            }
        }, 12000)
        setTimeout(() => {
          if (plan === "") {
            setTextContent("Formatting document...");
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
        
        plan = await dispatch(sessionActions.fetchLessonplanTeks({ grade: gradeLevel, knowledge, skill }));
        await setTextContent(<RichTextEditor text={plan.replace(/\n/g, '\n')} />)
        await setLogoVisible(false);
        await setVisible(true)
        await setFormVisible(false)
    };
    
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
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-5xl mt-14 mb-6">Teacher's AIde</h2>
      <p className="text-s px-6">A powerful AI assistant that can generate lessons plans for any subject.</p>
        <div>
          {formVisible && <Form onSubmit={handleFormSubmit} />}
          <br></br>
          <p>{text}</p>
        </div>
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
      );
    };

export default Teks;