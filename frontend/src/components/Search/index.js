import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { csrfFetch } from '../../store/csrf.js';

function Search() {
  const [searchResults, setSearchResults] = useState("")
  const dispatch = useDispatch();

 const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await csrfFetch("/api/search/get-submitted-prompts", {
        method: "GET",
      });
      const data = await response.json();
      const subPrompts = data.submittedPrompts[9]
      console.log(data.submittedPrompts);
      setSearchResults(subPrompts['response'])
      return data.response;
  }

  return (
    <div className="flex flex-col items-center" style={{ whiteSpace: 'pre-line' }}>
        <button onClick={handleSubmit}>Search</button>
        {searchResults && <p className="px-10 lg:px-[300px]">{searchResults}</p>}
   </div>
  );
}


export default Search;