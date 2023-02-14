import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const gradeOptions = ['Elementary', 'Middle School', 'High School'];
const subjectOptions = {
  Elementary: ['Math', 'Science', 'English'],
  'Middle School': ['Math', 'Science', 'English', 'Social Studies'],
  'High School': ['Math', 'Science', 'English', 'Social Studies', 'Foreign Language']
};
const knowledgeOptions = {
  Math: ['Algebra', 'Geometry', 'Calculus'],
  Science: ['Biology', 'Chemistry', 'Physics'],
  English: ['Literature', 'Grammar', 'Writing'],
  'Social Studies': ['US History', 'World History', 'Economics'],
  'Foreign Language': ['Spanish', 'French', 'German', 'Mandarin']
};
const skillOptions = {
  Algebra: ['Equations', 'Inequalities', 'Functions'],
  Geometry: ['Angles', 'Lines', 'Polygons'],
  Calculus: ['Derivatives', 'Integrals', 'Limits'],
  Biology: ['Cells', 'Genetics', 'Ecology'],
  Chemistry: ['Elements', 'Molecules', 'Reactions'],
  Physics: ['Mechanics', 'Electricity', 'Optics'],
  Literature: ['Poetry', 'Fiction', 'Drama'],
  Grammar: ['Nouns', 'Verbs', 'Adjectives'],
  Writing: ['Narrative', 'Persuasive', 'Descriptive'],
  'US History': ['Revolution', 'Civil War', 'WWII'],
  'World History': ['Ancient', 'Medieval', 'Modern'],
  Economics: ['Supply and Demand', 'Market Structures', 'Fiscal Policy'],
  Spanish: ['Grammar', 'Vocabulary', 'Conversation'],
  French: ['Grammar', 'Vocabulary', 'Conversation'],
  German: ['Grammar', 'Vocabulary', 'Conversation'],
  Mandarin: ['Grammar', 'Vocabulary', 'Conversation']
};

function Teks(props) {
    const [gradeLevel, setGradeLevel] = useState(gradeOptions[0]);
    const [subject, setSubject] = useState(subjectOptions[gradeLevel][0]);
    const [knowledge, setKnowledge] = useState(knowledgeOptions[subject][0]);
    const [skill, setSkill] = useState(skillOptions[knowledge][0]);
  
    const handleGradeChange = (event) => {
      const newGradeLevel = event.target.value;
      setGradeLevel(newGradeLevel);
      setSubject(subjectOptions[newGradeLevel][0]);
      setKnowledge(knowledgeOptions[subjectOptions[newGradeLevel][0]][0]);
      setSkill(skillOptions[knowledgeOptions[subjectOptions[newGradeLevel][0]][0]][0]);
    };
  
    const handleSubjectChange = (event) => {
      const newSubject = event.target.value;
      setSubject(newSubject);
      setKnowledge(knowledgeOptions[newSubject][0]);
      setSkill(skillOptions[knowledgeOptions[newSubject][0]][0]);
    };
  
    const handleKnowledgeChange = (event) => {
      const newKnowledge = event.target.value;
      setKnowledge(newKnowledge);
      setSkill(skillOptions[newKnowledge][0]);
    };
  
    const handleSkillChange = (event) => {
      const newSkill = event.target.value;
      setSkill(newSkill);
    };
  
    return (
      <form>
        <label>
          Grade level:
          <select value={gradeLevel} onChange={handleGradeChange}>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          </label>
  <br />
  <label>
    Subject:
    <select value={subject} onChange={handleSubjectChange}>
      {subjectOptions[gradeLevel].map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  </label>
  <br />
  <label>
    Knowledge:
    <select value={knowledge} onChange={handleKnowledgeChange}>
      {knowledgeOptions[subject].map((knowledge) => (
        <option key={knowledge} value={knowledge}>
          {knowledge}
        </option>
      ))}
    </select>
  </label>
  <br />
  <label>
    Skills:
    <select value={skill} onChange={handleSkillChange}>
      {skillOptions[knowledge].map((skill) => (
        <option key={skill} value={skill}>
          {skill}
        </option>
      ))}
    </select>
  </label>
  <br />
</form>
    )
}

export default Teks;