import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [skill, setSkill] = useState('');

  //structure form data so that innermost children are passed up through the select options (start with skill options)ß

  const subjectOptions = {
    // Elementary: ['Math', 'Science', 'English'],
    // 'Middle School': ['Math', 'Science', 'English', 'History'],
    'High School': ['High School Science'],
  };

  const knowledgeOptions = {
    'High School Science': ['Aquatic Science', 'Biology', 'Chemistry'],
  };

  const skillOptions = {
    'Chemistry': [
        "(1A) ask questions and define problems based on observations or information from text, phenomena, models, or investigations;","(1B) apply scientific practices to plan and conduct descriptive, comparative, and experimental investigations and use engineering practices to design solutions to problems;","(1C) use appropriate safety equipment and practices during laboratory, classroom, and field investigations as outlined in Texas Education Agency-approved safety standards;","(1D) use appropriate tools such as Safety Data Sheets (SDS), scientific or graphing calculators, computers and probes, electronic balances, an adequate supply of consumable chemicals, and sufficient scientific glassware such as beakers, Erlenmeyer flasks, pipettes, graduated cylinders, volumetric flasks, and burettes;","(1E) collect quantitative data using the International System of Units (SI) and qualitative data as evidence;","(1F) organize quantitative and qualitative data using oral or written lab reports, labeled drawings, particle diagrams, charts, tables, graphs, journals, summaries, or technology-based reports;","(1G) develop and use models to represent phenomena, systems, processes, or solutions to engineering problems; and","(1H) distinguish between scientific hypotheses, theories, and laws.",
        "(2A) identify advantages and limitations of models such as their size, scale, properties, and materials;","(2B) analyze data by identifying significant statistical features, patterns, sources of error, and limitations;","(2C) use mathematical calculations to assess quantitative relationships in data; and","(2D) evaluate experimental and engineering designs.",
        "(3A) develop explanations and propose solutions supported by data and models and consistent with scientific ideas, principles, and theories;","(3B) communicate explanations and solutions individually and collaboratively in a variety of settings and formats; and","(3C) engage respectfully in scientific argumentation using applied scientific explanations and empirical evidence.",
        "(4A) analyze, evaluate, and critique scientific explanations and solutions by using empirical evidence, logical reasoning, and experimental and observational testing, so as to encourage critical thinking by the student;", "(4B) relate the impact of past and current research on scientific thought and society, including research methodology, cost-benefit analysis, and contributions of diverse scientists as related to the content; and",  "(4C) research and explore resources such as museums, libraries, professional organizations, private companies, online platforms, and mentors employed in a science, technology, engineering, and mathematics (STEM) field in order to investigate STEM careers.",  
        "(5A) explain the development of the Periodic Table over time using evidence such as chemical and physical properties;",  "(5B) predict the properties of elements in chemical families, including alkali metals, alkaline earth metals, halogens, noble gases, and transition metals, based on valence electrons patterns using the Periodic Table; and",  "(5C) analyze and interpret elemental data, including atomic radius, atomic mass, electronegativity, ionization energy, and reactivity to identify periodic trends.", 
        "(6A) construct models using Dalton's Postulates, Thomson's discovery of electron properties, Rutherford's nuclear atom, Bohr's nuclear atom, and Heisenberg's Uncertainty Principle to show the development of modern atomic theory over time;",  "(6B) describe the structure of atoms and ions, including the masses, electrical charges, and locations of protons and neutrons in the nucleus and electrons in the electron cloud;",  "(6C) investigate the mathematical relationship between energy, frequency, and wavelength of light using the electromagnetic spectrum and relate it to the quantization of energy in the emission spectrum;",  "(6D) calculate average atomic mass of an element using isotopic composition; and",  "(6E) construct models to express the arrangement of electrons in atoms of representative elements using electron configurations and Lewis dot structures.",  
        "(7A) construct an argument to support how periodic trends such as electronegativity can predict bonding between elements;",  "(7B) name and write the chemical formulas for ionic and covalent compounds using International Union of Pure and Applied Chemistry (IUPAC) nomenclature rules;",  "(7C) classify and draw electron dot structures for molecules with linear, bent, trigonal planar, trigonal pyramidal, and tetrahedral molecular geometries as explained by Valence Shell Electron Pair Repulsion (VSEPR) theory; and",  "(7D) analyze the properties of ionic, covalent, and metallic substances in terms of intramolecular and intermolecular forces.",  
        "(8A) define mole and apply the concept of molar mass to convert between moles and grams;",  "(8B) calculate the number of atoms or molecules in a sample of material using Avogadro's number;",  "(8C) calculate percent composition of compounds; and",  "(8D) differentiate between empirical and molecular formulas.",
        "(9A) interpret, write, and balance chemical equations, including synthesis, decomposition, single replacement, double replacement, and combustion reactions using the law of conservation of mass;",  "(9B) differentiate among acid-base reactions, precipitation reactions, and oxidation-reduction reactions;",  "(9C) perform stoichiometric calculations, including determination of mass relationships, gas volume relationships, and percent yield; and",  "(9D) describe the concept of limiting reactants in a balanced chemical equation.",  
        "(10A) describe the postulates of the kinetic molecular theory;",  "(10B) describe and calculate the relationships among volume, pressure, number of moles, and temperature for an ideal gas; and",  "(10C) define and apply Dalton's law of partial pressure.",  
        "(11A) describe the unique role of water in solutions in terms of polarity;",  "(11B) distinguish among types of solutions, including electrolytes and nonelectrolytes and unsaturated, saturated, and supersaturated solutions;",  "(11C) investigate how solid and gas solubilities are influenced by temperature using solubility curves and how rates of dissolution are influenced by temperature, agitation, and surface area;",  "(11D) investigate the general rules regarding solubility and predict the solubility of the products of a double replacement reaction;",  "(11E) calculate the concentration of solutions in units of molarity; and",  "(11F) calculate the dilutions of solutions using molarity.",
        "(12A) name and write the chemical formulas for acids and bases using IUPAC nomenclature rules;","(12B) define acids and bases and distinguish between Arrhenius and Bronsted-Lowry definitions;","(12C) differentiate between strong and weak acids and bases;","(12D) predict products in acid-base reactions that form water; and","(12E) define pH and calculate the pH of a solution using the hydrogen ion concentration.",
        "(13A) explain everyday examples that illustrate the four laws of thermodynamics;","(13B) investigate the process of heat transfer using calorimetry;","(13C) classify processes as exothermic or endothermic and represent energy changes that occur in chemical reactions using thermochemical equations or graphical analysis; and","(13D) perform calculations involving heat, mass, temperature change, and specific heat.",
        "(14A) describe the characteristics of alpha, beta, and gamma radioactive decay processes in terms of balanced nuclear equations;","(14B) compare fission and fusion reactions; and","(14C) give examples of applications of nuclear phenomena such as nuclear stability, radiation therapy, diagnostic imaging, solar cells, and nuclear power."
    
    ],
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
        "(12A) analyze the interactions that occur among systems that perform the functions of regulation, nutrient absorption, reproduction, and defense from injury or illness in animals;","(12B) explain how the interactions that occur among systems that perform functions of transport, reproduction, and response in plants are facilitated by their structures.",
        "(13A) investigate and evaluate how ecological relationships, including predation, parasitism, commensalism, mutualism, and competition, influence ecosystem stability;","(13B) analyze how ecosystem stability is affected by disruptions to the cycling of matter and flow of energy through trophic levels using models;","(13C) explain the significance of the carbon and nitrogen cycles to ecosystem stability and analyze the consequences of disrupting these cycles; and","(13D) explain how environmental change, including change due to human activity, affects biodiversity and analyze how changes in biodiversity impact ecosystem stability.",
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
    <form className="mt-10 mb-6 px-2" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="gradeLevel">Grade Level:</label>
        <select id="gradeLevel" value={gradeLevel} onChange={handleGradeLevelChange}>
          <option value="">Select a grade level</option>
          {/*<option value="Elementary">Elementary</option>*/}
          {/*<option value="Middle School">Middle School</option>*/}
          <option value="High School">High School</option>
        </select>
        </div>
        {gradeLevel && (
        <div className="mb-2">
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
        <div className="mb-2">
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
        <div className="w-fit">
        <label htmlFor="skill">Skill:</label>
        <select id="skill" className="w-96 truncate" value={skill} onChange={handleSkillChange}>
          <option className="w-28" value="">Select a skill</option>
          {skillOptions[knowledge].map((option) => (
          <option className="w-28" key={option} value={option}>
          {option}
          </option>
        ))}
        </select>
        </div>
        )}
        {skill && (
        <div className="mt-2">
        <button className="mt-6 w-28 h-10 bg-slate-300 border text-l hover:bg-slate-500" type="submit">Submit</button>
      </div>
      )}
    </form>
    );
    };
    
    export default Form;
    
    
    
    