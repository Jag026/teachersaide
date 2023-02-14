import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [skill, setSkill] = useState('');

  //structure form data so that innermost children are passed up through the select options (start with skill options)ß

  const subjectOptions = {
    Elementary: ['Math', 'Science', 'English'],
    'Middle School': ['Math', 'Science', 'English', 'History'],
    'High School': ['Math', 'High School Science', 'English', 'History', 'Foreign Language'],
  };

  const knowledgeOptions = {
    Math: ['Algebra', 'Geometry', 'Trigonometry'],
    Science: ['Biology', 'Chemistry', 'Physics'],
    English: ['Literature', 'Grammar', 'Composition'],
    History: ['World History', 'US History', 'European History'],
    'Foreign Language': ['Spanish', 'French', 'German', 'Mandarin'],
    'High School Science': ['Aquatic Science', 'Biology', 'Chemistry', 'Physics'],
  };

  const skillOptions = {
    Algebra: ['Equations', 'Graphing', 'Functions'],
    Geometry: ['Angles', 'Lines', 'Circles'],
    Trigonometry: ['Trigonometric Functions', 'Identities', 'Equations'],
    Biology: ['Anatomy', 'Genetics', 'Ecology'],
    Chemistry: ['Elements', 'Compounds', 'Reactions'],
    Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
    Literature: ['Novels', 'Poetry', 'Drama'],
    Grammar: ['Parts of Speech', 'Sentence Structure', 'Punctuation'],
    Composition: ['Essays', 'Research Papers', 'Creative Writing'],
    'World History': ['Ancient History', 'Medieval History', 'Modern History'],
    'US History': ['Colonial America', 'Civil War', 'World War II'],
    'European History': ['Renaissance', 'Enlightenment', 'World War I'],
    Spanish: ['Grammar', 'Vocabulary', 'Conversational Skills'],
    French: ['Grammar', 'Vocabulary', 'Conversational Skills'],
    German: ['Grammar', 'Vocabulary', 'Conversational Skills'],
    Mandarin: ['Grammar', 'Vocabulary', 'Conversational Skills'],
    'Aquatic Science': ["(A1) ask questions and define problems based on observations or information from text, phenomena, models, or investigations;","(B1) apply scientific practices to plan and conduct descriptive, comparative, and experimental investigations and use engineering practices to design solutions to problems;","(C1) use appropriate safety equipment and practices during laboratory, classroom, and field investigations as outlined in Texas Education Agency-approved safety standards;","(D1) use appropriate tools such as Global Positioning System (GPS), Geographic Information System (GIS), weather balloons, etc.;","(E1) collect quantitative data using the International System of Units (SI) and qualitative data as evidence;","(F1) organize quantitative and qualitative data using probeware, spreadsheets, lab notebooks or journals, models, diagrams, graphs paper, computers, or cellphone applications;","(G1) develop and use models to represent phenomena, systems, processes, or solutions to engineering problems; and","(H1) distinguish between scientific hypotheses, theories, and laws."]
    };
    
    const handleGradeLevelChange = (event) => {
    const value = event.target.value;
    setGradeLevel(value);
    setSubject('');
    setKnowledge('');
    setSkill('');
    };
    
    const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
    setKnowledge('');
    setSkill('');
    };
    
    const handleKnowledgeChange = (event) => {
    const value = event.target.value;
    setKnowledge(value);
    setSkill('');
    };
    
    const handleSkillChange = (event) => {
    const value = event.target.value;
    setSkill(value);
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
    gradeLevel,
    subject,
    knowledge,
    skill,
    };
    onSubmit(values);
    };
    
    return (
    <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="gradeLevel">Grade Level:</label>
    <select id="gradeLevel" value={gradeLevel} onChange={handleGradeLevelChange}>
    <option value="">Select a grade level</option>
    <option value="Elementary">Elementary</option>
    <option value="Middle School">Middle School</option>
    <option value="High School">High School</option>
    </select>
    </div>
    {gradeLevel && (
    <div>
    <label htmlFor="subject">Subject:</label>
    <select id="subject" value={subject} onChange={handleSubjectChange}>
    <option value="">Select a subject</option>
    {subjectOptions[gradeLevel].map((option) => (
    <option key={option} value={option}>
    {option}
    </option>
    ))}
    </select>
    </div>
    )}
    {subject && (
    <div>
    <label htmlFor="knowledge">Knowledge:</label>
    <select id="knowledge" value={knowledge} onChange={handleKnowledgeChange}>
    <option value="">Select a knowledge</option>
    {knowledgeOptions[subject].map((option) => (
    <option key={option} value={option}>
    {option}
    </option>
    ))}
    </select>
    </div>
    )}
    {knowledge && (
    <div>
    <label htmlFor="skill">Skill:</label>
    <select id="skill" value={skill} onChange={handleSkillChange}>
    <option value="">Select a skill</option>
    {skillOptions[knowledge].map((option) => (
    <option key={option} value={option}>
    {option}
    </option>
    ))}
    </select>
    </div>
    )}
    {skill && (
    <div>
    <button type="submit">Submit</button>
    </div>
    )}
    </form>
    );
    };
    
    export default Form;
    
    
    
    