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
    'Aquatic Science': [
        "(A1) ask questions and define problems based on observations or information from text, phenomena, models, or investigations;","(B1) apply scientific practices to plan and conduct descriptive, comparative, and experimental investigations and use engineering practices to design solutions to problems;","(C1) use appropriate safety equipment and practices during laboratory, classroom, and field investigations as outlined in Texas Education Agency-approved safety standards;","(D1) use appropriate tools such as Global Positioning System (GPS), Geographic Information System (GIS), weather balloons, etc.;","(E1) collect quantitative data using the International System of Units (SI) and qualitative data as evidence;","(F1) organize quantitative and qualitative data using probeware, spreadsheets, lab notebooks or journals, models, diagrams, graphs paper, computers, or cellphone applications;","(G1) develop and use models to represent phenomena, systems, processes, or solutions to engineering problems; and","(H1) distinguish between scientific hypotheses, theories, and laws.","(2A) identify advantages and limitations of models such as their size, scale, properties, and materials;",
        "(2B) analyze data by identifying significant statistical features, patterns, sources of error, and limitations;","(2C) use mathematical calculations to assess quantitative relationships in data; and","(2D) evaluate experimental and engineering designs.",
        "(3A) develop explanations and propose solutions supported by data and models consistent with scientific ideas, principles, and theories;","(3B) communicate explanations and solutions individually and collaboratively in a variety of settings and formats; and","(3C) engage respectfully in scientific argumentation using applied scientific explanations and empirical evidence.",
        "(4A) analyze, evaluate, and critique scientific explanations and solutions by using empirical evidence, logical reasoning, and experimental and observational testing, so as to encourage critical thinking by the student;","(4B) relate the impact of past and current research on scientific thought and society, including research methodology, cost-benefit analysis, and contributions of diverse scientists as related to the content; and","(4C) research and explore resources such as museums, planetariums, observatories, libraries, professional organizations, private companies, online platforms, and mentors employed in a science, technology, engineering, and mathematics (STEM) field in order to investigate STEM careers.",
        "(5A) describe how the shape and polarity of the water molecule make it a 'universal solvent' in aquatic systems;","(5B) identify how aquatic ecosystems are affected by water's properties of adhesion, cohesion, surface tension, heat capacity, and thermal conductivity; and","(5C) explain how the density of water is critical for organisms in cold environments.","(6A) identify key features and characteristics of atmospheric, geological, hydrological, and biological systems as they relate to aquatic environments;",
        "(6B) describe the interrelatedness of atmospheric, geological, hydrological, and biological systems in aquatic ecosystems, including positive and negative feedback loops; and","(6C) evaluate environmental data using technology such as maps, visualizations, satellite data, Global Positioning System (GPS), Geographic Information System (GIS), weather balloons, and buoys to model the interactions that affect aquatic ecosystems.",
        "(7A) identify how energy flows and matter cycles through both freshwater and marine aquatic systems, including food webs, chains, and pyramids;","(7B) identify biological, chemical, geological, and physical components of an aquatic life zone as they relate to the organisms in it;","(7C) identify variables that affect the solubility of carbon dioxide and oxygen in water;","(7D) evaluate factors affecting aquatic population cycles such as lunar cycles, temperature variations, hours of daylight, and predator-prey relationships; and","(7E) identify the interdependence of organisms in an aquatic environment such as in a pond, a river, a lake, an ocean, or an aquifer and the biosphere.",
        "(8A) evaluate data over a period of time from an established aquatic environment documenting seasonal changes and the behavior of organisms;","(8B) collect and analyze pH, salinity, temperature, mineral content, nitrogen compounds, dissolved oxygen, and turbidity data periodically, starting with baseline measurements; and","(8C) use data from short-term or long-term studies to analyze interrelationships between producers, consumers, and decomposers in aquatic ecosystems.",
        "(9A) identify the role of carbon, nitrogen, water, and nutrient cycles in an aquatic environment, including upwellings and turnovers;",
        "(9B) examine the interrelationships between aquatic systems and climate and weather, including El Niño and La Niña, currents, and hurricanes; and","(9C) explain how tidal cycles influence intertidal ecology.",
        "(10A) identify sources of water in a watershed, including rainfall, groundwater, and surface water;","(10B) identify factors that contribute to how water flows through a watershed;","(10C) analyze water quantity and quality in a local watershed or aquifer; and","(10D) describe human uses of fresh water and how human freshwater use competes with that of other organisms.",
        "(11A) examine basic principles of fluid dynamics, including hydrostatic pressure, density as a result of salinity, and buoyancy;"
     ],
    'Biology': [
        "(1A) ask questions and define problems based on observations or information from text, phenomena, models, or investigations;","(1B) apply scientific practices to plan and conduct descriptive, comparative, and experimental investigations and use engineering practices to design solutions to problems;","(1C) use appropriate safety equipment and practices during laboratory, classroom, and field investigations as outlined in Texas Education Agency-approved safety standards;","(1D) use appropriate tools such as microscopes, slides, Petri dishes, laboratory glassware, metric rulers, digital balances, pipets, filter paper, micropipettes, gel electrophoresis and polymerase chain reaction (PCR) apparatuses, microcentrifuges, water baths, incubators, thermometers, hot plates, data collection probes, test tube holders, lab notebooks or journals, hand lenses, and models, diagrams, or samples of biological specimens or structures;","(1E) collect quantitative data using the International System of Units (SI) and qualitative data as evidence;","(1F) organize quantitative and qualitative data using scatter plots, line graphs, bar graphs, charts, data tables, digital tools, diagrams, scientific drawings, and student-prepared models;","(1G) develop and use models to represent phenomena, systems, processes, or solutions to engineering problems; and","(1H) distinguish among scientific hypotheses, theories, and laws.",
        "(2A) identify advantages and limitations of models such as their size, scale, properties, and materials;","(2B) analyze data by identifying significant statistical features, patterns, sources of error, and limitations;","(2C) use mathematical calculations to assess quantitative relationships in data; and","(2D) evaluate experimental and engineering designs.",
        "(3A) develop explanations and propose solutions supported by data and models and consistent with scientific ideas, principles, and theories;","(3B) communicate explanations and solutions individually and collaboratively in a variety of settings and formats; and","(3C) engage respectfully in scientific argumentation using applied scientific explanations and empirical evidence.",
        "(4A) analyze, evaluate, and critique scientific explanations and solutions by using empirical evidence, logical reasoning, and experimental and observational testing, so as to encourage critical thinking by the student;",
        "(4B) relate the impact of past and current research on scientific thought and society, including research methodology, cost-benefit analysis, and contributions of diverse scientists as related to the content; and",
        "(4C) research and explore resources such as museums, libraries, professional organizations, private companies, online platforms, and mentors employed in a science, technology, engineering, and mathematics (STEM) field in order to investigate STEM careers.",
        "(5A) relate the functions of different types of biomolecules, including carbohydrates, lipids, proteins, and nucleic acids, to the structure and function of a cell;","(5B) compare and contrast prokaryotic and eukaryotic cells, including their complexity, and compare and contrast scientific explanations for cellular complexity;","(5C) investigate homeostasis through the cellular transport of molecules; and","(5D) compare the structures of viruses to cells and explain how viruses spread and cause disease.",
        "(6A) explain the importance of the cell cycle to the growth of organisms, including an overview of the stages of the cell cycle and deoxyribonucleic acid (DNA) replication models;","(6B) explain the process of cell specialization through cell differentiation, including the role of environmental factors; and","(6C) relate disruptions of the cell cycle to how they lead to the development of diseases such as cancer.",
        "(7A) identify components of DNA, explain how the nucleotide sequence specifies some traits of an organism, and examine scientific explanations for the origin of DNA;","(7B) describe the significance of gene expression and explain the process of protein synthesis using models of DNA and ribonucleic acid (RNA);","(7C) identify and illustrate changes in DNA and evaluate the significance of these changes; and","(7D) discuss the importance of molecular technologies such as polymerase chain reaction (PCR), gel electrophoresis, and genetic engineering that are applicable in current research and engineering practices.",
        "(8A) analyze the significance of chromosome reduction, independent assortment, and crossing-over during meiosis in increasing diversity in populations of organisms that reproduce sexually; and","(8B) predict possible outcomes of various genetic combinations using monohybrid and dihybrid crosses, including non-Mendelian traits of incomplete dominance, codominance, sex-linked traits, and multiple alleles.",
        "(9A) analyze and evaluate how evidence of common ancestry among groups is provided by the fossil record, biogeography, and homologies, including anatomical, molecular, and developmental; and","(9B) examine scientific explanations for varying rates of change such as gradualism, abrupt appearance, and stasis in the fossil record.",
        "(10A) analyze and evaluate how natural selection produces change in populations and not in individuals;","(10B) analyze and evaluate how the elements of natural selection, including inherited variation, the potential of a population to produce more offspring than can survive, and a finite supply of environmental resources, result in differential reproductive success;","(10C) analyze and evaluate how natural selection may lead to speciation; and","(10D) analyze evolutionary mechanisms other than natural selection, including genetic drift, gene flow, mutation, and genetic recombination, and their effect on the gene pool of a population.",
        "(11A) explain how matter is conserved and energy is transferred during photosynthesis and cellular respiration using models, including the chemical equations for these processes; and","(11B) investigate and explain the role of enzymes in facilitating cellular processes.",
        "(12A) analyze the interactions that occur among systems that perform the functions of regulation, nutrient absorption, reproduction, and defense from injury or illness in animals;"
    ]
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
    
    
    
    