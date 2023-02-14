import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Form from './Teks-form';


function Teks(props) {
    const dispatch = useDispatch();
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

    const handleFormSubmit = async(values) => {
        setFormValues(values);
        console.log(formValues.skill);
        setGrade(formValues.gradeLevel)
        setKnowledge(formValues.knowledge)
        setSkill(formValues.skill)
        let plan =  await dispatch(await sessionActions.fetchLessonplanTeks({ grade, knowledge, skill }))
        console.log(plan)
        setText(plan)
      };
    
      return (
        <div>
          <Form onSubmit={handleFormSubmit} />
          <br></br>
          <p>{text}</p>
        </div>
      );
    };

export default Teks;