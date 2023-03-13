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
      const subPrompts = data.submittedPrompts[0]
      console.log(data.submittedPrompts[0]);
      setSearchResults(subPrompts['response'].replace(/\n/g, `<br />`))
      return data.response;
  }

  return (
    <div className="flex flex-col items-center">
        <button onClick={handleSubmit}>Search</button>
        {searchResults && <p>{searchResults}</p>}
   </div>
  );
}


export default Search;